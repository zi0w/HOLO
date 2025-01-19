// app/mypage/[id]/_components/Mypost/hooks/useMyPosts.ts
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from '@/lib/utils/supabase/client';
import type { Post } from "@/app/mypage/_types/mypage";

const fetchMyPosts = async (userId: string): Promise<Post[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      created_at,
      categories,
      post_image_url,
      user_id,
      users (
        nickname,
        profile_image_url
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  if (!data) return [];
  
  return data;
};

const deletePost = async (postId: string): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
};

export const useMyPosts = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [deletingPosts, setDeletingPosts] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => fetchMyPosts(userId || ""),
    enabled: !!userId,
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deletePost,
    onMutate: (postId) => {
      setDeletingPosts(prev => new Set(prev).add(postId));
    },
    onSuccess: () => {
      alert("게시물이 삭제되었습니다.");
    },
    onError: (error) => {
      alert("게시물 삭제 중 오류가 발생했습니다.");
      console.error("게시물 삭제 실패:", error);
    },
    onSettled: (_, __, postId) => {
      setDeletingPosts(prev => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });

  const handleDelete = async (postId: string) => {
    try {
      await deleteMutation.mutateAsync(postId);
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  const isDeleting = (postId: string) => deletingPosts.has(postId);

  return {
    posts,
    isLoading,
    handleDelete,
    isDeleting,
  };
};
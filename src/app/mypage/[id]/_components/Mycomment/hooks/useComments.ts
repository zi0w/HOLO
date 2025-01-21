// hooks/useComments.ts
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from '@/lib/utils/supabase/client';
import type { CommentWithPost } from "@/app/mypage/[id]/_components/_type/comment";

const fetchCommentData = async (userId: string): Promise<CommentWithPost[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      comment,
      created_at,
      user_id,
      post_id,
      users (
        id,
        nickname,
        profile_image_url
      ),
      posts (
        id,
        title,
        content,
        created_at,
        categories,
        post_image_url
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  if (!data) return [];
  
  return data as CommentWithPost[];
};

const deleteComment = async (commentId: string): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) throw error;
};

export const useComments = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const { data: comments = [], isLoading } = useQuery<CommentWithPost[]>({
    queryKey: ["comments", userId],
    queryFn: () => fetchCommentData(userId || ""),
    enabled: !!userId,
  });

  const deleteCommentMutation = useMutation<
    void,
    Error,
    string,
    { previousComments: CommentWithPost[] }
  >({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["comments", userId] });

      const previousComments = queryClient.getQueryData<CommentWithPost[]>([
        "comments",
        userId,
      ]) || [];

      queryClient.setQueryData<CommentWithPost[]>(["comments", userId], (old = []) => {
        return old.filter((comment) => comment.id !== commentId);
      });

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", userId],
          context.previousComments,
        );
      }
      alert("댓글 삭제 중 오류가 발생했습니다.");
    },
    onSuccess: () => {
      // alert("댓글이 삭제되었습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", userId] });
    },
  });

  const handleDelete = async (commentId: string) => {
    // if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteCommentMutation.mutateAsync(commentId);
      } catch (error) {
        console.error("댓글 삭제 중 오류:", error);
      }
    // }
  };

  return {
    comments,
    isLoading,
    handleDelete,
  };
};
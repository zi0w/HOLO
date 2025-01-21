import { getId } from "@/app/honeytips/_utils/auth";
import type { Post } from "@/app/mypage/_types/myPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { MutationContext } from "@/app/mypage/[id]/_components/_type/post";
import {
  deletePost,
  fetchMyPostsData,
} from "@/app/mypage/[id]/_components/mypost/_utils/posts";

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
    queryKey: ["myPosts", userId],
    queryFn: () => (userId ? fetchMyPostsData(userId) : Promise.resolve([])),
    enabled: !!userId,
  });

  const deletePostMutation = useMutation<void, Error, string, MutationContext>({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["myPosts", userId] });

      const previousPosts =
        queryClient.getQueryData<Post[]>(["myPosts", userId]) || [];

      queryClient.setQueryData<Post[]>(["myPosts", userId], (old = []) => {
        return old.filter((post) => post.id !== postId);
      });

      setDeletingPosts((prev) => new Set(prev).add(postId));

      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(["myPosts", userId], context.previousPosts);
      }
      // alert("게시글 삭제 중 오류가 발생했습니다.");
    },
    onSuccess: () => {
      // alert("게시글이 삭제되었습니다.");
    },
    onSettled: (_, __, postId) => {
      setDeletingPosts((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["myPosts", userId] });
    },
  });

  const handleDelete = async (postId: string) => {
    // if (window.confirm("게시글을 삭제하시겠습니까?")) {
    try {
      await deletePostMutation.mutateAsync(postId);
    } catch (error) {
      console.error("게시글 삭제 중 오류:", error);
    }
    // }
  };

  return {
    posts,
    isLoading,
    handleDelete,
    isDeleting: (postId: string) => deletingPosts.has(postId),
  };
};

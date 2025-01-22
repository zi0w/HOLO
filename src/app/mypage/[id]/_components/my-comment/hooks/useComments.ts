import { getId } from "@/app/honeytips/_utils/auth";
import type { CommentWithPost } from "@/app/mypage/_types/useMyTypes";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type PostComment = {
  id: string;
  comment: string;
  created_at: string;
  user_id: string;
  post_id: string;
  users?: {
    id: string;
    nickname: string;
    profile_image_url?: string;
  };
}

const fetchCommentData = async (userId: string): Promise<CommentWithPost[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
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
    .eq("user_id", userId);

  if (error) throw error;
  if (!data) return [];
  return data as CommentWithPost[];
};

const deleteComment = async (commentId: string): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

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
    { previousComments: CommentWithPost[]; postId?: string }
  >({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      // 모든 관련 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["comments", userId] });
      await queryClient.cancelQueries({ queryKey: ["myLikes", userId] });

      const previousComments =
        queryClient.getQueryData<CommentWithPost[]>(["comments", userId]) || [];

      const targetComment = previousComments.find(
        (comment) => comment.id === commentId,
      );
      const postId = targetComment?.post_id;

      if (postId) {
        // 게시물 관련 쿼리도 취소
        await queryClient.cancelQueries({ queryKey: ["post", postId] });
        await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      }

      // 낙관적 업데이트
      queryClient.setQueryData<CommentWithPost[]>(
        ["comments", userId],
        (old = []) => old.filter((comment) => comment.id !== commentId),
      );

      // 게시물의 댓글 목록도 낙관적 업데이트
      if (postId) {
        queryClient.setQueryData<PostComment[]>(
          ["comments", postId],
          (old = []) => old.filter((comment) => comment.id !== commentId)
        );
      }

      return { previousComments, postId };
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
    onSuccess: async (_, commentId, context) => {
      if (context?.postId) {
        // 게시물 관련 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ["post", context.postId] });
        await queryClient.invalidateQueries({ queryKey: ["comments", context.postId] });
        await queryClient.invalidateQueries({ queryKey: ["postComments", context.postId] });
      }
      // 마이페이지 관련 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ["comments", userId] });
      await queryClient.invalidateQueries({ queryKey: ["myLikes", userId] });
    },
    onSettled: async (_, __, ___, context) => {
      if (context?.postId) {
        await queryClient.invalidateQueries({ queryKey: ["post", context.postId] });
        await queryClient.invalidateQueries({ queryKey: ["comments", context.postId] });
        await queryClient.invalidateQueries({ queryKey: ["postComments", context.postId] });
      }
      await queryClient.invalidateQueries({ queryKey: ["comments", userId] });
      await queryClient.invalidateQueries({ queryKey: ["myLikes", userId] });
    },
  });

  const handleDelete = async (commentId: string) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  return {
    comments,
    isLoading,
    handleDelete,
  };
};


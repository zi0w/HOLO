// hooks/useComments.ts
import { getId } from "@/app/honeytips/_utils/auth";
import type { CommentWithPost } from "@/app/mypage/[id]/_components/_type/Comment";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// 반환 타입을 명시적으로 CommentWithPost[]로 지정
const fetchCommentData = async (userId: string): Promise<CommentWithPost[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
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
    `,
    )
    .eq("user_id", userId);

  if (error) throw error;
  if (!data) return [];

  // 타입 단언을 사용하여 반환 타입을 명확히 함
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

  // 쿼리 옵션 타입을 명시적으로 지정
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
      await queryClient.cancelQueries({ queryKey: ["comments", userId] });
      
      const previousComments =
        queryClient.getQueryData<CommentWithPost[]>(["comments", userId]) || [];
      
      const targetComment = previousComments.find(
        (comment) => comment.id === commentId
      );
      const postId = targetComment?.post_id;

      queryClient.setQueryData<CommentWithPost[]>(
        ["comments", userId],
        (old = []) => old.filter((comment) => comment.id !== commentId)
      );

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
    onSuccess: (_, __, context) => {
      if (context?.postId) {
        queryClient.invalidateQueries({ queryKey: ["post", context.postId] });
        queryClient.invalidateQueries({ 
          queryKey: ["postComments", context.postId] 
        });
      }
    },
    onSettled: (_, __, ___, context) => {
      queryClient.invalidateQueries({ queryKey: ["comments", userId] });
      if (context?.postId) {
        queryClient.invalidateQueries({ queryKey: ["post", context.postId] });
        queryClient.invalidateQueries({ 
          queryKey: ["postComments", context.postId] 
        });
      }
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


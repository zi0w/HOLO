"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import {
  addComment,
  deleteComment,
  updateComment,
} from "@/app/honeytips/_utils/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { comment: Comment["comment"]; postId: Comment["post_id"] }
  >({
    mutationFn: ({ comment, postId }) => addComment({ comment, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("댓글 추가 중 뮤테이션 오류가 발생했습니다.", error.message);
    },
  });
};

type MutationVariable = {
  editingComment: Comment["comment"];
  editingId: Comment["id"];
  postId: Comment["post_id"];
};
type ContextVariable = { previousComments: Comment[] | undefined };

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, MutationVariable, ContextVariable>({
    mutationFn: ({ editingComment, editingId, postId }) =>
      updateComment({ editingComment, editingId, postId }),
    onMutate: async ({ editingComment, editingId, postId }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      // 현재 댓글 데이터 가져오기
      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
        postId,
      ]);

      queryClient.setQueryData<Comment[]>(["comments", postId], (prev) =>
        prev?.map((comment) =>
          comment.id === editingId
            ? { ...comment, comment: editingComment }
            : comment,
        ),
      );
      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", context.previousComments[0].post_id],
          context.previousComments,
        );
      }
    },
    onSettled: (_, __, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Comment["id"]>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("댓글 삭제 중 뮤테이션 오류가 발생했습니다.", error.message);
    },
  });
};

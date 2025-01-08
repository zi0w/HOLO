"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import {
  addComment,
  deleteComment,
  updateComment,
} from "@/app/honeytips/_utils/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 코멘트 추가
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
      console.error("댓글 추가 중 오류 발생:", error.message);
    },
  });
};

// 코멘트 수정
type MutationVariable = {
  editingComment: Comment["comment"];
  editingId: Comment["id"];
  postId: Comment["post_id"];
};
type ContextVariable = { previousComments: Comment[] | undefined };

export const useUpdateComment = () => {
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

      // 수정하려는 댓글만 업데이트
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
      // 오류 발생 시, 이전 데이터를 복원
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", context.previousComments[0].post_id],
          context.previousComments,
        );
      }
    },
    onSuccess: (_, { postId }) => {
      // 댓글 업데이트 성공 후 해당 댓글 목록을 새로고침
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onSettled: (_, __, { postId }) => {
      // 성공/실패 여부에 관계없이 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

// 코멘트 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Comment["id"]>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {},
  });
};

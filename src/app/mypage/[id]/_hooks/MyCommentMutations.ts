"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import {
  addComment,
  deleteComment,
  updateComment,
} from "@/app/honeytips/_utils/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const myAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { comment: Comment["comment"]; postId: Comment["post_id"]; userId: string }
  >({
    mutationFn: ({ comment, postId, userId }) => addComment({ comment, postId, userId }),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["commentedPosts", userId] });
    },
    onError: (error) => {
      console.error("Comment addition mutation error occurred.", error.message);
    },
  });
};

type CommentUpdateVariable = {
  editingComment: Comment["comment"];
  editingId: Comment["id"];
  postId: Comment["post_id"];
  userId: string;
};

type CommentUpdateContext = { previousComments: Comment[] | undefined };

export const myUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CommentUpdateVariable, CommentUpdateContext>({
    mutationFn: ({ editingComment, editingId, postId }) =>
      updateComment({ editingComment, editingId, postId }),
    onMutate: async ({ editingComment, editingId, postId }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

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
    onSuccess: (_, { postId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["commentedPosts", userId] });
    },
    onSettled: (_, __, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};

export const myDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { commentId: Comment["id"]; userId: string }>({
    mutationFn: ({ commentId }) => deleteComment(commentId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["commentedPosts", userId] });
    },
    onError: (error) => {
      console.error("Comment deletion mutation error occurred.", error.message);
    },
  });
};

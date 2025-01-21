"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Database } from "@/lib/types/supabase";

type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
  posts: {
    title: string;
    content: string;
    created_at: string;
  };
};

const supabase = createClient();

export const useCommentMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { commentId: string },
    { previousComments: Comment[] | undefined }
  >({
    mutationFn: async ({ commentId }) => {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      if (error) throw error;
    },
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", userId] });
      const previousComments = queryClient.getQueryData<Comment[]>(["comments", userId]);

      queryClient.setQueryData<Comment[]>(["comments", userId], (old) => {
        if (!old) return [];
        return old.filter(comment => comment.id !== commentId);
      });

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", userId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", userId] });
    },
  });
};

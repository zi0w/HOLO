"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Database } from "@/lib/types/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];

const supabase = createClient();

export const usePostMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    { postId: string },
    { previousPosts: Post[] | undefined }
  >({
    mutationFn: async ({ postId }) => {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
    },
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: ["myPosts", userId] });
      const previousPosts = queryClient.getQueryData<Post[]>(["myPosts", userId]);

      queryClient.setQueryData<Post[]>(["myPosts", userId], (old) => {
        if (!old) return [];
        return old.filter(post => post.id !== postId);
      });

      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["myPosts", userId], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts", userId] });
    },
  });
}; 
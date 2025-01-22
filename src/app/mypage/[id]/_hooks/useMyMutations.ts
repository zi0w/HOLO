import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import type { Comment, Like, MutationContext, Post } from "@/app/mypage/_types/useMyTypes";


const supabase = createClient();

export const useMutations = (userId: string) => {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["myPosts", userId] });
      const previousPosts = queryClient.getQueryData<Post[]>(["myPosts", userId]);

      queryClient.setQueryData<Post[]>(["myPosts", userId], (old) =>
        old?.filter((post) => post.id !== postId)
      );

      return { previousPosts } as MutationContext;
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["myPosts", userId], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts", userId] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["myComments", userId] });
      const previousComments = queryClient.getQueryData<Comment[]>(["myComments", userId]);

      queryClient.setQueryData<Comment[]>(["myComments", userId], (old) =>
        old?.filter((comment) => comment.id !== commentId)
      );

      return { previousComments } as MutationContext;
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["myComments", userId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myComments", userId] });
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (likeId: string) => {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onMutate: async (likeId) => {
      await queryClient.cancelQueries({ queryKey: ["myLikes", userId] });
      const previousLikes = queryClient.getQueryData<Like[]>(["myLikes", userId]);

      queryClient.setQueryData<Like[]>(["myLikes", userId], (old) =>
        old?.filter((like) => like.id !== likeId)
      );

      return { previousLikes } as MutationContext;
    },
    onError: (err, variables, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(["myLikes", userId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myLikes", userId] });
    },
  });

  return {
    postMutation,
    commentMutation,
    likeMutation,
  };
};
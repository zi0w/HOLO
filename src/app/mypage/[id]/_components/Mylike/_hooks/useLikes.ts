// hooks/useLikes.ts
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getId } from "@/app/honeytips/_utils/auth";
// iy
;
import { addLike, deleteLike, fetchLikePostsData } from "@/app/mypage/[id]/_components/Mylike/_utils/likes";
import type { Post } from "@/app/mypage/_types/mypage";
import type { Like } from "@/app/mypage/[id]/_components/_type/types";

type MutationContext = {
  previousPosts: Post[] | undefined;
  previousPost: Post | undefined;
  previousLikeData: Like[] | undefined;
};

export const useLikes = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [likingPosts, setLikingPosts] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const { data: likedPosts, isLoading } = useQuery<Post[]>({
    queryKey: ["likedPosts", userId],
    queryFn: () => fetchLikePostsData(userId || ""),
    enabled: !!userId,
  });

  const likeMutation = useMutation<
    void,
    Error,
    { postId: string; action: "add" | "delete" },
    MutationContext
  >({
    mutationFn: async ({ postId, action }) => {
      if (!userId) throw new Error("User not logged in");
      if (action === "add") {
        await addLike(userId, postId);
      } else {
        await deleteLike(userId, postId);
      }
    },
    onMutate: async ({ postId, action }) => {
      if (!userId) throw new Error("User not logged in");

      setLikingPosts(prev => new Set(prev).add(postId));

      await queryClient.cancelQueries({ queryKey: ["likedPosts", userId] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      await queryClient.cancelQueries({ queryKey: ["likes", postId] });

      const previousPosts = queryClient.getQueryData<Post[]>(["likedPosts", userId]);
      const previousPost = queryClient.getQueryData<Post>(["post", postId]);
      const previousLikeData = queryClient.getQueryData<Like[]>(["likes", postId]);

      queryClient.setQueryData<Post[]>(["likedPosts", userId], (old) => {
        if (!old) return old;
        if (action === "delete") {
          return old.filter((post) => post.id !== postId);
        }
        return old;
      });

      return { previousPosts, previousPost, previousLikeData };
    },
    onSuccess: (_, { action }) => {
      alert(
        action === "add" 
          ? "게시글을 좋아요 했습니다." 
          : "게시글 좋아요를 취소했습니다."
      );
    },
    onError: (_, __, context) => {
      if (!userId) return;

      alert("좋아요 처리 중 오류가 발생했습니다.");

      if (context?.previousPosts) {
        queryClient.setQueryData(["likedPosts", userId], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["post", context.previousPost.id], context.previousPost);
      }
      if (context?.previousLikeData) {
        queryClient.setQueryData(["likes", context.previousPost?.id], context.previousLikeData);
      }
    },
    onSettled: (_, __, { postId }) => {
      if (!userId) return;

      setLikingPosts(prev => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });

      queryClient.invalidateQueries({ queryKey: ["likedPosts", userId] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const handleLikeChange = async (postId: string, action: "add" | "delete") => {
    if (!userId) return;
    try {
      await likeMutation.mutateAsync({ postId, action });
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return {
    likedPosts,
    isLoading,
    handleLikeChange,
    isLiking: (postId: string) => likingPosts.has(postId),
  };
};


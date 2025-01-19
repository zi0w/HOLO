// hooks/useLikes.ts
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getId } from "@/app/honeytips/_utils/auth";

import { v4 as uuidv4 } from "uuid";
import type { Post,  Like} from "@/app/mypage/[id]/_components/_type/types";
import { addLike, deleteLike, fetchLikePostsData } from "@/app/mypage/[id]/_components/Mylike/_utils/likes";

type MutationContext = {
  previousPosts: Post[] | undefined;
  previousPost: Post | undefined;
  previousLikeData: Like[] | undefined;
};

// 새로운 좋아요 생성을 위한 타입
type NewLike = Omit<Like, "id">;

export const useLikes = () => {
  const [userId, setUserId] = useState<string | null>(null);
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

      await queryClient.cancelQueries({ queryKey: ["likedPosts", userId] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      await queryClient.cancelQueries({ queryKey: ["likes", postId] });

      const previousPosts = queryClient.getQueryData<Post[]>(["likedPosts", userId]);
      const previousPost = queryClient.getQueryData<Post>(["post", postId]);
      const previousLikeData = queryClient.getQueryData<Like[]>(["likes", postId]);

      const newLike: NewLike = {
        user_id: userId,
        post_id: postId,
      };

      queryClient.setQueryData<Post[]>(["likedPosts", userId], (old) => {
        if (!old) return old;
        if (action === "delete") {
          return old.filter((post) => post.id !== postId);
        }
        return old;
      });

      queryClient.setQueryData<Post>(["post", postId], (old): Post | undefined => {
        if (!old) return old;
        const updatedPost: Post = {
          ...old,
          likes:
            action === "delete"
              ? old.likes.filter((like) => like.user_id !== userId)
              : [...old.likes, { ...newLike } as Like],
        };
        return updatedPost;
      });

      queryClient.setQueryData<Like[]>(["likes", postId], (old) => {
        if (!old) return old;
        if (action === "delete") {
          return old.filter((like) => like.user_id !== userId);
        }
        const likeWithId: Like = {
          ...newLike,
          id: uuidv4(),
        };
        return [...old, likeWithId];
      });

      return { previousPosts, previousPost, previousLikeData };
    },
    onError: (_, __, context) => {
      if (!userId) return;

      if (context?.previousPosts) {
        queryClient.setQueryData(["likedPosts", userId], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(
          ["post", context.previousPost.id],
          context.previousPost,
        );
      }
      if (context?.previousLikeData) {
        queryClient.setQueryData(
          ["likes", context.previousPost?.id],
          context.previousLikeData,
        );
      }
    },
    onSettled: () => {
      if (!userId) return;

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
  };
};
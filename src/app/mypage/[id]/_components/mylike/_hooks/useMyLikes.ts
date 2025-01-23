import { getId } from "@/app/honeytips/_utils/auth";
import {
  addLike,
  deleteLike,
  fetchLikePostsData,
} from "@/app/mypage/[id]/_components/mylike/_utils/likes";
import type { MutationContext } from "@/app/mypage/_types/like";
import type { Post } from "@/app/mypage/_types/myPage";
import type { Like } from "@/app/mypage/_types/useMyTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const UseLikes = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [likingPosts, setLikingPosts] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    text: "",
    isConfirm: false,
    onAction: () => {},
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      const id = await getId();
      setUserId(id);
      if (id) {
        await queryClient.prefetchQuery({
          queryKey: ["likedPosts", id],
          queryFn: () => fetchLikePostsData(id),
          staleTime: 0,
        });
      }
    };
    fetchUserIdAndData();
  }, [queryClient]);

  const { data: likedPosts, isPending } = useQuery<Post[]>({
    queryKey: ["likedPosts", userId],
    queryFn: () => fetchLikePostsData(userId || ""),
    enabled: !!userId,
    staleTime: 0,
    refetchOnMount: true,
  });

  const likeMutation = useMutation<
    void,
    Error,
    { postId: string; action: "add" | "delete" },
    MutationContext
  >({
    mutationFn: async ({ postId, action }) => {
      if (!userId) throw new Error("사용자가 로그인하지 않았습니다");
      if (action === "add") {
        await addLike(userId, postId);
      } else {
        await deleteLike(userId, postId);
      }
    },
    onMutate: async ({ postId, action }) => {
      if (!userId) throw new Error("사용자가 로그인하지 않았습니다");

      setLikingPosts((prev) => new Set(prev).add(postId));

      await queryClient.cancelQueries({ queryKey: ["likedPosts", userId] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });
      await queryClient.cancelQueries({ queryKey: ["likes", postId] });

      const previousPosts = queryClient.getQueryData<Post[]>([
        "likedPosts",
        userId,
      ]);
      const previousPost = queryClient.getQueryData<Post>(["post", postId]);
      const previousLikeData = queryClient.getQueryData<Like[]>([
        "likes",
        postId,
      ]);

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
      setModalConfig({
        text: action === "add" ? "게시글을 좋아요" : "게시글 좋아요 가 취소",
        isConfirm: false,
        onAction: () => setShowModal(false),
      });
      setShowModal(true);
    },
    onError: (_, __, context) => {
      if (!userId) return;

      setModalConfig({
        text: "좋아요 처리 중 오류가 발생",
        isConfirm: false,
        onAction: () => setShowModal(false),
      });
      setShowModal(true);

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
    onSettled: (_, __, { postId }) => {
      if (!userId) return;

      setLikingPosts((prev) => {
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
    isPending,
    handleLikeChange,
    isLiking: (postId: string) => likingPosts.has(postId),
    showModal,
    modalConfig,
    closeModal: () => setShowModal(false),
  };
};


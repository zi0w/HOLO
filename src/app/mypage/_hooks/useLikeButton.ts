// hooks/useLikeButton.ts
import type { LikeAction } from "@/app/mypage/_types/like";
import { getCurrentUser, toggleLikeStatus } from "@/app/mypage/_utils/likes";
import { useGuestStore } from "@/hooks/useGuestAccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useLikeButton = (
  postId: string,
  isLiked: boolean,
  onLikeChange?: (postId: string, action: LikeAction) => Promise<void>,
) => {
  const queryClient = useQueryClient();
  const isGuest = useGuestStore((state) => state.isGuest);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    text: "",
    isConfirm: false,
    onAction: () => {},
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => {
      const user = await getCurrentUser();
      return toggleLikeStatus(user.id, postId, isLiked);
    },
    onSuccess: async (action) => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
      queryClient.invalidateQueries({ queryKey: ["myLikes"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });

      if (onLikeChange) {
        await onLikeChange(postId, action);
      }
    },
    onError: (error) => {
      console.error("좋아요 처리 중 오류:", error);
      setModalConfig({
        text: "좋아요 처리 중 오류가 발생",
        isConfirm: false,
        onAction: () => setShowModal(false),
      });
      setShowModal(true);
    },
  });

  const handleLike = async () => {
    if (isGuest) {
      setModalConfig({
        text: "로그인이 필요한 기능",
        isConfirm: false,
        onAction: () => setShowModal(false),
      });
      setShowModal(true);
      return;
    }

    try {
      await toggleLike();
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return { 
    handleLike,
    showModal,
    modalConfig,
    closeModal: () => setShowModal(false)
  };
};



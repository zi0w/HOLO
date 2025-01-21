// hooks/useLikeButton.ts
import type { LikeAction } from "@/app/mypage/_types/Like";
import { getCurrentUser, toggleLikeStatus } from "@/app/mypage/_utils/likes";

import { useGuestStore } from "@/hooks/useGuestAccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikeButton = (
  postId: string,
  isLiked: boolean,
  onLikeChange?: (postId: string, action: LikeAction) => Promise<void>,
) => {
  const queryClient = useQueryClient();
  const isGuest = useGuestStore((state) => state.isGuest);

  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => {
      const user = await getCurrentUser();
      return toggleLikeStatus(user.id, postId, isLiked);
    },
    onSuccess: async (action) => {
      // 캐시 무효화 키 수정
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
      alert("좋아요 처리 중 오류가 발생했습니다.");
    },
  });

  const handleLike = async () => {
    if (isGuest) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    try {
      await toggleLike();
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return { handleLike };
};

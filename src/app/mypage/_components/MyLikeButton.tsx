// components/LikeButton.tsx
"use client";

import { useLikeButton } from "@/app/mypage/_hooks/useLikeButton";
import type { LikeButtonProps } from "@/app/mypage/_types/like";
import YesHeart from "@/assets/images/honeytips/love_selected_42.svg";
import NoHeart from "@/assets/images/honeytips/love_unselected_42.svg";

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  isLiked,
  likeCount = 0,
  onLikeChange,
}) => {
  const { handleLike } = useLikeButton(postId, isLiked, onLikeChange);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className="flex items-center focus:outline-none"
        aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      >
        {isLiked ? (
          <YesHeart className="w-[42px] h-[42px]" />
        ) : (
          <NoHeart className="w-[42px] h-[42px]" />
        )}
      </button>
      {likeCount > 0 && (
        <span className="text-sm text-gray-600">({likeCount})</span>
      )}
    </div>
  );
};

export default LikeButton;
import { UseLikes } from "@/app/mypage/[id]/_components/mylike/_hooks/useMyLikes";
import YesHeart from "@/assets/images/honeytips/love_selected_42.svg";
import NoHeart from "@/assets/images/honeytips/love_unselected_42.svg";
import { useEffect, useState } from "react";

export type LikeButtonProps = {
  postId: string;
  isLiked: boolean;
  onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
};

const MyLikeButton = ({ postId, isLiked, onLikeChange }: LikeButtonProps) => {
  const { isLiking } = UseLikes();
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleClick = async () => {
    const action = liked ? "delete" : "add";
    setLiked(!liked);
    await onLikeChange(postId, action);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLiking(postId)}
      className={`flex items-center justify-center transition-all ${
        isLiking(postId) ? "cursor-not-allowed opacity-50" : "hover:scale-110"
      }`}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
    >
      {liked ? (
        <YesHeart className="h-[50px] w-[50px] text-[#FF7600]" />
      ) : (
        <NoHeart className="h-[50px] w-[50px] text-[#999999]" />
      )}
    </button>
  );
};

export default MyLikeButton;

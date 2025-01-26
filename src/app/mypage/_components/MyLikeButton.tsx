"use client";

import Image from "next/image";
import mylikebutton from "@/assets/images/mypage/mylikesbutton.svg"


export type LikeButtonProps = {
  postId: string;
  onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
  onClick?: () => void;
};

const MyLikeButton = ({ postId, onLikeChange, onClick }: LikeButtonProps) => {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      
      await onLikeChange(postId, "delete");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex h-[50px] w-[50px] items-center justify-center transition-all hover:scale-110"
      aria-label="좋아요 취소"
    >
      <Image 
      src={mylikebutton}
      alt="좋아요 취소"
      width={50}
      height={50}
      className="h-[30px] w-[30px] opacity-100"
    />
    </button>
  );
};

export default MyLikeButton;


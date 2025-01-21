// components/LikeButton.tsx
import { useLikes } from "@/app/mypage/[id]/_components/Mylike/_hooks/useLikes";
import YesHeart from "@/assets/images/honeytips/love_selected_42.svg";
import NoHeart from "@/assets/images/honeytips/love_unselected_42.svg";
import { useEffect, useState } from "react";

export type LikeButtonProps = {
  postId: string;
  isLiked: boolean;
  onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
}

const MyLikeButton = ({ postId, isLiked, onLikeChange }: LikeButtonProps) => {
  const { isLiking } = useLikes();
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleClick = async () => {
    const action = liked ? "delete" : "add";
    setLiked(!liked);
    await onLikeChange(postId, action);
  };

  // src/app/mypage/_components/MyLikeButton.tsx
  return (
    <button
      onClick={handleClick}
      disabled={isLiking(postId)}
      className={`flex items-center justify-center transition-all ${
        isLiking(postId) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
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














//원본 건드리지마라
// // components/LikeButton.tsx
// import { useLikes } from "@/app/mypage/[id]/_components/Mylike/_hooks/useLikes";
// import YesHeart from "@/assets/images/honeytips/love_selected_42.svg";
// import NoHeart from "@/assets/images/honeytips/love_unselected_42.svg";
// import { useEffect, useState } from "react";

// export type LikeButtonProps = {
//   postId: string;
//   isLiked: boolean;
//   onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
// }

// const MyLikeButton = ({ postId, isLiked, onLikeChange }: LikeButtonProps) => {
//   const { isLiking } = useLikes();
//   const [liked, setLiked] = useState(isLiked);

//   useEffect(() => {
//     setLiked(isLiked);
//   }, [isLiked]);

//   const handleClick = async () => {
//     const action = liked ? "delete" : "add";
//     setLiked(!liked);
//     await onLikeChange(postId, action);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       disabled={isLiking(postId)}
//       className={`transition-all ${isLiking(postId) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
//       aria-label={liked ? "좋아요 취소" : "좋아요"}
//     >
//       {liked ? (
//         <YesHeart className="h-4 w-4 text-[#FF7600]" />
//       ) : (
//         <NoHeart className="h-4 w-4 text-[#999999]" />
//       )}
//     </button>
//   );
// };

// export default MyLikeButton;




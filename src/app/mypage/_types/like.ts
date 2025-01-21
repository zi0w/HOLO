import type { Like } from "@/app/mypage/[id]/_components/_type/types";
import type { Post } from "@/app/mypage/_types/myPage";
export type LikeButtonProps = {
  postId: string;
  isLiked: boolean;
  likeCount?: number;
  onLikeChange?: (postId: string, action: "delete" | "add") => Promise<void>;
};

export type LikeAction = "delete" | "add";

export type MutationContext = {
  previousPosts: Post[] | undefined;
  previousPost: Post | undefined;
  previousLikeData: Like[] | undefined;
};

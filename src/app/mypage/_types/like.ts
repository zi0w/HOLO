
import type { Post } from "@/app/mypage/_types/myPage";
import type { Like } from "@/app/mypage/_types/useMyTypes";
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

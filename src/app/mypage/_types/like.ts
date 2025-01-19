// types/like.ts
export type LikeButtonProps = {
    postId: string;
    isLiked: boolean;
    likeCount?: number;
    onLikeChange?: (postId: string, action: "delete" | "add") => Promise<void>;
  };
  
  export type LikeAction = "delete" | "add";
// types/mypage.ts
export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    categories: string;
    post_image_url: string[] | null;
    user_id: string;
    users: {
      nickname: string;
      profile_image_url: string | null;
    };
  };
  
  export type ProfileUpdateData = {
    nickname?: string;
    profile_image_url?: string | null;
  };
  
  export type User = {
    id: string;
    nickname: string;
    profile_image_url: string | null;
    email: string;
  };
  
  export type ActiveSection = "likes" | "comments" | "myPosts";
  
  export type ProfileEditModalProps = {
    isOpen: boolean;
    onClose: () => void;
  };
  
  export type MyLikeCardProps = {
    post: Post;
    onLikeChange: (postId: string, action: "delete" | "add") => Promise<void>;
  };
export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    categories: string;
    post_image_url: string[] | null;
    user_id: string;
    users?: {
      nickname: string;
      profile_image_url: string | null;
    };
    likes?: Like[];
  };
  
  export type Comment = {
    id: string;
    user_id: string;
    post_id: string;
    content: string;
    created_at: string;
    updated_at?: string;
    nickname?: string;
    profile_image_url?: string | null;
    posts?: Post;
  };
  
  export type Like = {
    user_id: string;
    post_id: string;
    id: string;
    posts?: Post;
  };
  
  export type MutationContext = {
    previousPosts?: Post[];
    previousComments?: Comment[];
    previousLikes?: Like[];
  };


  export type CommentWithPost = {
  id: string;
  comment: string;
  created_at: string;
  post_id: string;
  user_id: string;
  users?: {
    id: string;
    nickname: string;
    profile_image_url: string | null;
  };
  posts: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    categories: string;
    post_image_url: string[] | null;
  };
};
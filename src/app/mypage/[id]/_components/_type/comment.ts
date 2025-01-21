export type Comment = {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  updated_at?: string;
  nickname?: string;
  profile_image_url?: string | null;
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
export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  categories: string;
  comments?: Comment[];
};

export type Like = {
  user_id: string; // null을 허용하지 않도록 수정
  post_id?: string;
  id?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  categories: string;
  post_image_url: string[] | null;
  user_id: string;
  likes: Like[];
  users: {
    nickname: string;
    profile_image_url: string | null;
  };
};



export type Post = {
  id: string; 
  title: string; 
  content: string; 
  created_at: string; 
  user_id: string; 
  post_image_url: string[] | null; 
  likes: { user_id: string }[]; 
  users: {
    nickname: string; // 작성자 닉네임
    profile_image_url: string | null; 
  };
  comments?: { count: number }[]; 
  categories?: string[]; 
};

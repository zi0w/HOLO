export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  categories: string;
  post_image_url: string[] | null;
  user_id: string;
};

export type MutationContext = {
  previousPosts: Post[];
};

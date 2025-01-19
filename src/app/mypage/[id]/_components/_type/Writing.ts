// types/post.ts
export type Writing = {
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
  
  export type MutationContext = {
    previousPosts: Writing[] | undefined;
  };
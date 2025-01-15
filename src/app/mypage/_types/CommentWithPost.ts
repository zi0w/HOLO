// types.ts
export type CommentWithPost = {
    id: string;
    comment: string;
    created_at: string;
    post_id: string;
    users: {
      nickname: string;
      profile_image_url: string | null;
    };
    posts: {
      id: string;
      title: string;
      content: string;
      users: {
        nickname: string;
        profile_image_url: string | null;
      };
    };
  };
  
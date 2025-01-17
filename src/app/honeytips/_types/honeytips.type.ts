import type { Tables } from "@/lib/types/supabase";

export type Post = Tables<"posts"> & {
  users: {
    nickname: string;
    profile_image_url: string | null;
  };
  likes: {
    count: number;
  }[];
  comments: {
    count: number;
  }[];
};


export type User = Tables<"users">;

export type Comment = Tables<"comments"> & {
  users: {
    nickname: string;
    profile_image_url: string | null;
  };
};

export type Like = Tables<"likes">;

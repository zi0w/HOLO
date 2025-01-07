import type { Tables } from "@/lib/types/supabase";

export type Post = Tables<"posts"> & {
  users: {
    nickname: string;
    profile_image_url: string | null;
  };
};

export type User = Tables<"users">;

export type Comment = Tables<"comments">;

export type Like = Tables<"likes">;

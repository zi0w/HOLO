import type { Tables } from "@/lib/types/supabase";

export type User = {
  nickname: string;
  profile_image_url: string | null;
};




export type Comment = Tables<"comments"> & {
  users: User; 
  post_title?: string; 
};










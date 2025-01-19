// api/posts.ts
import type { Writing } from "@/app/mypage/[id]/_components/_type/Writing";
import { createClient } from "@/lib/utils/supabase/client";


const supabase = createClient();

export const fetchMyPostsData = async (userId: string): Promise<Writing[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      users (
        nickname,
        profile_image_url
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const deletePost = async (postId: string) => {
  const { error } = await supabase
    .from("posts")
    .delete()
    .match({ id: postId });
  if (error) throw error;
};
// src/app/mypage/[id]/_components/Mypost/_utils/posts.ts
import type { Post } from "@/app/mypage/_types/myPage";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchMyPostsData = async (userId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      created_at,
      categories,
      post_image_url,
      user_id,
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

export const deletePost = async (postId: string): Promise<void> => {
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) throw error;
};

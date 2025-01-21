// api/likes.ts
import type { Post } from "@/app/mypage/[id]/_components/_type/types";
import { createClient } from "@/lib/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export const fetchLikePostsData = async (userId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      likes!inner(user_id),
      users(nickname, profile_image_url)
    `,
    )
    .eq("likes.user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((post) => ({
    ...post,
    likes: post.likes.filter((like) => like.user_id !== null),
  }));
};

export const addLike = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from("likes")
    .insert([{ user_id: userId, post_id: postId, id: uuidv4() }]);
  if (error) throw error;
};

export const deleteLike = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from("likes")
    .delete()
    .match({ user_id: userId, post_id: postId });
  if (error) throw error;
};

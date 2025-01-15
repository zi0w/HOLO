import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// Fetch all posts with their likes and user information
export const MyfetchLikePostsData = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, likes(user_id), users(nickname, profile_image_url), post_image_url") // Join users table to get nickname and profile image URL
    .order("created_at", { ascending: false }); // Sort by creation time

  if (error) {
   
    throw error;
  }

 

  return data || [];
};

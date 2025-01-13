import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// Fetch all posts with their likes
export const fetchLikePostsData = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, likes(user_id)") // Join likes table to get user_id
    .order("created_at", { ascending: false }); // Sort by creation time

  if (error) {
    console.error("Error fetching liked posts:", error);
    throw error;
  }

  return data || [];




  
};



import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();


export const MyfetchLikePostsData = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, likes(user_id), users(nickname, profile_image_url), post_image_url") 
    .order("created_at", { ascending: false }); 
  if (error) {
   
    throw error;
  }

 

  return data || [];
};

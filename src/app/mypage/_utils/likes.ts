// api/likes.ts
import type { LikeAction } from "@/app/mypage/_types/like";
import { createClient } from "@/lib/utils/supabase/client";


const supabase = createClient();

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error("사용자 인증에 실패했습니다.");
  }
  return user;
};

export const toggleLikeStatus = async (
  userId: string,
  postId: string,
  isLiked: boolean
): Promise<LikeAction> => {
  if (isLiked) {
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .match({ 
        user_id: userId, 
        post_id: postId 
      });

    if (deleteError) throw deleteError;
    return "delete";
  } else {
    const { error: insertError } = await supabase
      .from("likes")
      .insert({ 
        user_id: userId, 
        post_id: postId 
      });

    if (insertError) throw insertError;
    return "add";
  }
};
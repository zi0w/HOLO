import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 포스트 디테일 불러오기
export const fetchPostDetail = async (id: Post["id"]) => {
  try {
    if (!id) return null;

    const { data: detailData, error } = await supabase
      .from("posts")
      .select(
        "*, users(nickname, profile_image_url), comments(count), likes(count)",
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return detailData;
  } catch (error) {
    console.error("포스트 디테일 불러오기에 실패했습니다.", error);
    throw error;
  }
};

// 포스트 삭제
export const deletePost = async (id: Post["id"]) => {
  try {
    const { data: detailData, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return detailData;
  } catch (error) {
    console.error("포스트 삭제에 실패했습니다.", error);
    throw error;
  }
};

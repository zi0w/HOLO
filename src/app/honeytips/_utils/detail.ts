import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 포스트 상세 정보 가져오기
export const fetchPostDetail = async (id: Post["id"]) => {
  if (!id) return null;
  const { data: detailData, error } = await supabase
    .from("posts")
    .select("*, users(nickname, profile_image_url)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("포스트 상세 정보 불러오기에 실패했습니다.");
    throw error;
  }
  return detailData;
};

// 포스트 삭제
export const deletePost = async (id: Post["id"]) => {
  const { data: detailData, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("코멘트 삭제에 실패했습니다.");
    throw error;
  }
  return detailData;
};

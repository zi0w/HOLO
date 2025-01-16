// "use server";

// import type { Post } from "@/app/honeytips/_types/honeytips.type";
// import { createClient } from "@/lib/utils/supabase/server";
// import { revalidatePath } from "next/cache";

// // 포스트 상세 정보 가져오기
// export const fetchPostDetail = async (id: Post["id"]) => {
//   const supabase = await createClient();
//   if (!id) return null;
//   const { data: detailData, error } = await supabase
//     .from("posts")
//     .select(
//       "*, users(nickname, profile_image_url), comments(count), likes(count)",
//     )
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error("포스트 상세 정보 불러오기에 실패했습니다.");
//     throw error;
//   }

//   revalidatePath(`/honeytips/${id}`);

//   return detailData;
// };

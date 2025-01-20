// import { createClient } from "@/lib/utils/supabase/client";

// const supabase = createClient();

// // 좋아요가 있는 모든 게시물을 가져옵니다.
// export const fetchLikePostsData = async () => {
//   const { data, error } = await supabase
//     .from("posts")
//     .select("*, likes(user_id)") // 좋아요 테이블을 조인하여 user_id를 가져옵니다.
//     .order("created_at", { ascending: false }); // 생성 시간순으로 정렬

//   if (error) {
//     console.error("좋아요를 누른 게시물을 가져오는 중 오류 발생:", error);
//     throw error;
//   }

//   return data || [];
// };

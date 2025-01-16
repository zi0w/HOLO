import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import { Post } from "@/app/mypage/_types/MyComment"

// Post 타입 임포트

const supabase = createClient(); // Supabase 클라이언트 생성

// 사용자 ID로 작성한 게시글 데이터를 가져오는 함수
export const MyfetchWritingPostsData = async (
  userId: string,
): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      likes(user_id),
      users(nickname, profile_image_url),
      post_image_url
    `,
    )
    .eq("user_id", userId) // 특정 사용자 ID에 해당하는 게시글만 가져오기
    .order("created_at", { ascending: false }); // 최신 순으로 정렬

  if (error) {
    console.error("작성한 게시물 불러오기 실패:", error);
    throw error;
  }

  return data || []; // 데이터 반환 (없으면 빈 배열)
};


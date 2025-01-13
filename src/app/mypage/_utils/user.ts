import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트를 생성하는 함수를 임포트합니다.

// Supabase 클라이언트를 생성합니다.
const supabase = createClient();

/**
 * 사용자 정보를 가져오는 함수
 * @param {string} userId - 사용자 ID
 * @returns {Promise<{ nickname: string; profile_image_url: string } | null>} - 사용자 정보 객체 또는 null
 */
export async function fetchUserInfo(userId: string) {
  // Supabase에서 'users' 테이블에서 사용자 정보를 가져옵니다.
  const { data, error } = await supabase
    .from("users") // 'users' 테이블을 지정합니다.
    .select("nickname, profile_image_url") // 가져올 필드를 지정합니다: nickname과 profile_image_url.
    .eq("id", userId) // 조건을 설정하여 특정 사용자 ID와 일치하는 데이터를 검색합니다.
    .single(); // 단일 레코드만 반환하도록 설정합니다.

  // 에러가 발생한 경우
  if (error) {
    console.error("Error fetching user info:", error); // 에러 메시지를 콘솔에 출력합니다.
    return null; // null을 반환하여 에러를 나타냅니다.
  }

  return data; // 성공적으로 가져온 사용자 정보를 반환합니다.
}

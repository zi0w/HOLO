//이컴포넌트는 생존

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
    .eq("id", userId) 
    .single(); 

  
  if (error) {
    console.error("Error fetching user info:", error); 
    return null; 
  }

  return data; 
}




export const deleteUserAccount = async (userId: string) => {
  const response = await fetch("/api/delete-user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "회원 탈퇴 처리 중 오류가 발생했습니다.");
  }

  return data;
};

export const signOutUser = async () => {
  const supabase = createClient();
  return await supabase.auth.signOut();
};
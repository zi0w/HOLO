import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

/**
 * 사용자 정보를 가져오는 함수
 * @param {string} userId - 사용자 ID
 * @returns {Promise<{ nickname: string; profile_image_url: string } | null>} - 사용자 정보 객체 또는 null
 */
export async function fetchUserInfo(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("nickname, profile_image_url")
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

export {};
import type { User } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 유저 아이디 가져오기
export const getId = async (): Promise<User['id'] | null> => {
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData.user) {
    console.error("유저 아이디 불러오기에 실패했습니다.");
    return null;
  }
  return userData.user.id;
};

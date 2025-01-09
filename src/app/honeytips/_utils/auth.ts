import type { User } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 유저 아이디 가져오기
export const getId = async (): Promise<User['id'] | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.error("유저 아이디 불러오기 실패!", error);
    return null;
  }
  return data.user.id;
};

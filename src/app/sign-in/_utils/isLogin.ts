import { createClient } from "@/lib/utils/supabase/server";

export const isLogin = async (): Promise<boolean> => {
  const supabase = await createClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("세션 가져오기 실패:", error.message);
      return false;
    }

    return !!session?.user; // 세션에 사용자 정보가 있으면 true 반환
  } catch (err) {
    console.error("isLogin 함수 오류:", err);
    return false;
  }
};

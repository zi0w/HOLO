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

    return !!session?.user; 
  } catch (err) {
    console.error("isLogin 함수 오류:", err);
    return false;
  }
};

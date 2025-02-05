"use client";

import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export const useSignout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      clearAuth();
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      


      return { success: true };
    } catch (error: unknown) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error instanceof Error) {
        errorMessage = "로그아웃 중 문제가 발생했습니다.";
      }
      return { success: false, error: errorMessage };
    }
  };

  return { handleLogout, router };
};

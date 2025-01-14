"use client";

import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트
import useAuthStore from "@/store/authStore"; // Zustand 스토어
import { useRouter } from "next/navigation"; // Next.js 라우터

export const useSignout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      // Supabase 로그아웃 호출
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 상태 초기화
      clearAuth();

      // 쿠키/로컬 스토리지 정리
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      localStorage.removeItem("auth-storage");

      // 로그아웃 완료 후 이동
      alert("로그아웃 성공!");
      router.push("/sign-in"); // 로그인 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("로그아웃 실패:", error.message);
        alert("로그아웃 중 문제가 발생했습니다.");
      } else {
        console.error("알 수 없는 오류 발생:", error);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return { handleLogout };
};

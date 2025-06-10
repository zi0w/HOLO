"use client";

import { signOutAction } from "@/app/sign-in/actions/signout";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";


export const useSignout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      const result = await signOutAction();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      clearAuth();
      return { success: true };
    } catch (error: unknown) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error instanceof Error) {
        errorMessage = error.message || "로그아웃 중 문제가 발생했습니다.";
      }
      return { success: false, error: errorMessage };
    }
  };

  return { handleLogout, router };
};


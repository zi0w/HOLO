// hooks/useDeleteAccount.ts
import { clearAllStorage } from "@/app/mypage/_utils/CleanUp";
import { deleteUserAccount, signOutUser } from "@/app/mypage/_utils/User";
import useAuthStore from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      window.alert("로그인이 필요합니다.");
      return;
    }

    // const confirmed = window.confirm(
    //   "정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.",
    // );

    // if (!confirmed) return;

    try {
      // 계정 삭제 API 호출
      await deleteUserAccount(user.id);

      // Supabase 세션 로그아웃
      await signOutUser();

      // 모든 상태 및 캐시 초기화
      queryClient.clear();
      clearAuth();

      // 스토리지 및 쿠키 정리
      clearAllStorage();

      // window.alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("회원 탈퇴 중 오류:", error);
      window.alert(
        error instanceof Error
          ? `회원 탈퇴 실패: ${error.message}`
          : "회원 탈퇴 중 오류가 발생했습니다.",
      );
    }
  };

  return { handleDeleteAccount };
};

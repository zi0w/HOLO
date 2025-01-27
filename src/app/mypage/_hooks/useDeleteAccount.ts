
import { clearAllStorage } from "@/app/mypage/_utils/cleanup";
import { deleteUserAccount, signOutUser } from "@/app/mypage/_utils/user";
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

    

    try {
     
      await deleteUserAccount(user.id);

    
      await signOutUser();

   
      queryClient.clear();
      clearAuth();

     
      clearAllStorage();

      
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

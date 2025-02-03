import CustomLogoutModal from "@/app/sign-in/_components/CustomLogoutModal";
import { useSignout } from "@/app/sign-in/_hooks/useSignout";
import MyPageIcon from "@/assets/images/common/header/mypage.svg";
import { useSignoutModalStore } from "@/store/signoutmodal/useSignoutModalStore";
import useAuthStore from "@/store/useAuthStore";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderAuthLink = () => {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();
  const { handleLogout, router } = useSignout();
  const queryClient = useQueryClient();
  const { openModal, setSuccess, setError, closeModal } =
    useSignoutModalStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const result = await handleLogout();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        closeModal();
        router.push("/sign-in");
        queryClient.clear();
        queryClient.resetQueries();
      }, 1000);
    },
    onError: (error: Error) => {
      setError(error.message || "로그아웃 중 오류가 발생했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleLogoutClick = () => {
    openModal("header", "header-logout");
  };

  const handleConfirmLogout = async (): Promise<void> => {
    logoutMutation.mutate();
  };

  if (isLoggedIn) {
    return (
      <>
        <Link
          href="/mypage"
          className={clsx(
            "flex flex-col items-center justify-between font-gmarket text-base-800 lg:mt-44 lg:items-start lg:text-lg",
            pathname.startsWith("/mypage") && "text-primary-500",
          )}
        >
          <MyPageIcon className="mb-1 lg:hidden" />
          마이 페이지
        </Link>
        <button
          className="hidden text-left font-gmarket text-lg text-base-800 lg:block"
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
        <CustomLogoutModal
          modalId="header"
          modalType="header-logout"
          onLogout={handleConfirmLogout}
        />
      </>
    );
    }
    
    return (
    <Link
      href="/sign-in"
      className={clsx(
        "flex flex-col items-center justify-between font-gmarket text-base-800 lg:mt-44 lg:items-start lg:text-lg",
        pathname.startsWith("/mypage") && "text-primary-500",
      )}
    >
      <MyPageIcon className="lg:hidden" />
      로그인
    </Link>
    );
    
};

export default HeaderAuthLink;



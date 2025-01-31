// src/app/sign-in/_components/SignoutButton.tsx
"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import LogoutModal from "./CustomLogoutModal";
import { useSignoutModalStore } from "@/store/signoutmodal/useSignoutModalStore";

const SignoutButton = () => {
  const { handleLogout, router } = useSignout();
  const { openModal, setSuccess, setError, closeModal } =
    useSignoutModalStore();
  const queryClient = useQueryClient();

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
    openModal("signout", "mypage-logout");
  };

  const handleConfirmLogout = async (): Promise<void> => {
    logoutMutation.mutate();
  };

  return (
    <>
      <button
        onClick={handleLogoutClick}
        className=" flex h-[48px] w-full items-center justify-center rounded-[4px] border border-primary-500 text-base text-primary-500 hover:bg-base-100 lg:w-[180px]"
      >
        로그아웃
      </button>
      <LogoutModal
        modalId="signout"
        modalType="mypage-logout"
        onLogout={handleConfirmLogout}
      />
    </>
  );
};

export default SignoutButton;


"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout";
import { useState } from "react";
import CustomLogoutModal from "./CustomLogoutModal";

const SignoutButton = () => {
  const { handleLogout, router } = useSignout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setErrorMessage(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      router.push("/sign-in");
    }
  };

  const handleConfirmLogout = async () => {
    const result = await handleLogout();
    if (result.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <>
      <button
        onClick={handleLogoutClick}
        className="font-pretendard flex h-[48px] w-full items-center justify-center rounded-[4px] border border-primary-500 text-base text-primary-500 hover:bg-base-100"
      >
        로그아웃
      </button>
      <CustomLogoutModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogout={handleConfirmLogout}
        isSuccess={isSuccess}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default SignoutButton;



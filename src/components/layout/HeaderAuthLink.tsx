import CustomLogoutModal from "@/app/sign-in/_components/CustomLogoutModal";
import { useSignout } from "@/app/sign-in/_hooks/useSignout";
import MyPageIcon from "@/assets/images/common/header/mypage.svg";
import useAuthStore from "@/store/authStore";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const HeaderAuthLink = () => {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();

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

  if (isLoggedIn) {
    return (
      <>
        <Link
          href="/mypage"
          className={clsx(
            "flex flex-col items-center justify-between font-gmarket text-base-800 lg:mt-[180px] lg:items-start lg:text-lg",
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
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLogout={handleConfirmLogout}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
        />
      </>
    );
  }

  return (
    <Link
      href="/sign-in"
      className={clsx(
        "flex flex-col items-center justify-between font-gmarket text-base-800 lg:mt-[180px] lg:items-start lg:text-lg",
        pathname.startsWith("/mypage") && "text-primary-500",
      )}
    >
      <MyPageIcon className="lg:hidden" />
      로그인
    </Link>
  );
};

export default HeaderAuthLink;

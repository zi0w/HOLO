import MyPageIcon from "@/assets/images/common/header/mypage.svg";
import useAuthStore from "@/store/authStore";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderAuthLink = () => {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();

  if (isLoggedIn) {
    return (
      <Link
        href="/mypage"
        className={clsx(
          "flex flex-col items-center justify-between",
          pathname.startsWith("/mypage") && "text-primary-500",
        )}
      >
        <MyPageIcon className="mb-1" />
        마이 페이지
      </Link>
    );
  }

  return (
    <Link
      href="/sign-in"
      className={clsx(
        "flex flex-col items-center justify-between",
        pathname.startsWith("/mypage") && "text-primary-500",
      )}
    >
      <MyPageIcon />
      로그인
    </Link>
  );
};

export default HeaderAuthLink;

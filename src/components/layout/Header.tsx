import MyPageIcon from "@/assets/images/common/header/mypage.svg";
import { NAVIGATION_PATHS } from "@/constants/navigation";
import useAuthStore from "@/store/authStore";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({ allHidden }: { allHidden: boolean }) => {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();

  return (
    <header
      className={clsx(
        "fixed bottom-0 z-10 w-full lg:left-0 lg:top-0 lg:h-screen lg:w-[240px] lg:bg-primary-50",
        allHidden && "hidden",
      )}
    >
      <nav className="flex justify-between border-t border-primary-200 bg-white px-5 pb-8 pt-2 text-xs text-base-700 lg:h-full lg:flex-col lg:justify-center lg:gap-10 lg:border-r lg:border-t-0 lg:p-5">
        {NAVIGATION_PATHS.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            href={path}
            className={clsx(
              "flex flex-col items-center",
              path === "/"
                ? pathname === "/"
                : pathname.startsWith(path) && "text-primary-500",
            )}
          >
            <Icon
              className={clsx(
                path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(path) && "text-primary-500",
              )}
            />
            {label}
          </Link>
        ))}
        {isLoggedIn ? (
          <Link
            href="/mypage"
            className={clsx(
              "flex flex-col items-center",
              pathname.startsWith("/mypage") && "text-primary-500",
            )}
          >
            <MyPageIcon />
            마이 페이지
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className={clsx(
              "flex flex-col items-center",
              pathname.startsWith("/sign-in") && "text-primary-500",
            )}
          >
            <MyPageIcon />
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

import Logo from "@/assets/images/common/logo.png";
import { NAVIGATION_PATHS } from "@/constants/navigation";
import useAuthStore from "@/store/authStore";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const HeaderContent = ({ hidden }: { hidden: boolean }) => {
  const { isLoggedIn } = useAuthStore();

  return (
    <header
      className={clsx(
        "h-[60px] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[240px] lg:bg-primary-50",
        hidden && "h-0 !opacity-0",
      )}
    >
      <div className="lg:flex lg:h-full lg:flex-col lg:p-5">
        <div className="fixed left-0 top-0 z-10 flex w-full justify-between bg-primary-50 p-5 lg:static lg:justify-center lg:bg-transparent lg:p-0">
          <Link
            href="/"
            className="relative h-5 w-full max-w-16 lg:h-[50px] lg:max-w-[100px]"
          >
            <Image
              src={Logo}
              fill={true}
              className="object-contain"
              alt="로고"
            />
          </Link>
        </div>
        <nav className="lg:pb-19 fixed bottom-0 left-0 z-10 flex h-[60px] w-full justify-around border-t border-t-gray-500 bg-white p-5 text-sm font-bold lg:static lg:mb-auto lg:mt-[100px] lg:h-auto lg:flex-col lg:items-center lg:gap-7 lg:border-b lg:border-t-0 lg:border-gray-500 lg:bg-primary-50 lg:p-0 lg:pb-10 lg:text-center lg:text-xl">
          {NAVIGATION_PATHS.map(({ path, label }) => (
            <Link key={path} href={path}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-3 lg:text-lg lg:font-bold">
          {isLoggedIn ? (
            <Link href="/mypage">마이 페이지</Link>
          ) : (
            <Link href="/sign-in">로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;

"use client";

import Logo from "@/assets/images/common/logo.png";
import Nav from "@/components/layout/Nav";
import useAuthStore from "@/store/authStore";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const Header = ({ allHidden, mobileHidden }: { allHidden: boolean, mobileHidden: boolean }) => {
  const { isLoggedIn } = useAuthStore();

  return (
    <header
      className={clsx(
        "h-[60px] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[240px] lg:bg-primary-50",
        allHidden && "hidden",
        mobileHidden && "hidden lg:block",
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
        <Nav isMobile={false} />
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

export default Header;

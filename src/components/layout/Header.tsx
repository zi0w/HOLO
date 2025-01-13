"use client";

import useCheckAuth from "@/app/hooks/useCheckAuth";
import Logo from "@/assets/images/common/logo.svg";
import MypageIcon from "@/assets/images/common/mypage-icon.svg";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  useCheckAuth();   //소셜로그인 
  const supabase = createClient();

  return (
    <header className="h-[60px] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[240px] lg:bg-gray-200">
      <div className="lg:flex lg:h-full lg:flex-col lg:p-5">
        <div className="fixed left-0 top-0 z-10 flex w-full justify-between bg-gray-200 p-5 lg:static lg:justify-center lg:bg-transparent lg:p-0">
          <Link
            href="/"
            className="relative h-5 w-full max-w-16 lg:h-[50px] lg:max-w-[100px]"
          >
            <Image src={Logo} fill={true} alt="로고" />
          </Link>
          <Link href="/mypage">
            <div className="relative h-4 w-4 lg:hidden">
              <Image src={MypageIcon} fill={true} alt="마이페이지 아이콘" />
            </div>
          </Link>
        </div>
        <nav className="lg:pb-19 fixed bottom-0 left-0 z-10 flex h-[60px] w-full justify-around bg-gray-200 p-5 text-sm font-bold lg:static lg:mb-auto lg:mt-[100px] lg:h-auto lg:flex-col lg:items-center lg:gap-7 lg:border-b lg:border-gray-500 lg:p-0 lg:pb-10 lg:text-center lg:text-xl">
          <Link href="/">홈</Link>
          <Link href="/recommend">오늘 뭐하지</Link>
          <Link href="/trash-guide">쓰레기 가이드</Link>
          <Link href="/map">우리동네 지도</Link>
          <Link href="/honeytips">꿀팁 게시판</Link>
        </nav>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-3 lg:text-lg lg:font-bold">
          <Link href="/sign-in">로그인</Link>
          {/* 로그인시에만 보임 */}
          <Link href="/mypage">마이 페이지</Link>
          <button type="button" onClick={() => supabase.auth.signOut()}>
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

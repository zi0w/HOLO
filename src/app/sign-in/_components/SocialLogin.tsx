// components/SocialLogin.tsx
"use client";


import { useSocialLogin } from "@/app/sign-in/_hooks/useSocialLogin";
import Image from "next/image";

const SocialLogin: React.FC = () => {
  const { handleSocialLogin } = useSocialLogin();

  return (
    <div className="flex space-x-4">
      {/* 네이버 로그인 버튼 - 임시 비활성화
      <button
        onClick={() => handleSocialLogin("naver")}
        className="h-12 w-12 rounded-full bg-[#03C75A] p-2"
      >
        <Image
          src="/social/naver.svg"
          alt="네이버 로그인"
          width={48}
          height={48}
        />
      </button>
      */}

      <button
        onClick={() => handleSocialLogin("kakao")}
        className="h-12 w-12 rounded-full bg-[#FEE500] p-2"
      >
        <Image
          src="/social/kakao.svg"
          alt="카카오 로그인"
          width={48}
          height={48}
        />
      </button>

      <button
        onClick={() => handleSocialLogin("google")}
        className="h-12 w-12 rounded-full bg-white p-2 shadow-md"
      >
        <Image
          src="/social/google.svg"
          alt="구글 로그인"
          width={48}
          height={48}
        />
      </button>

      <button
        onClick={() => handleSocialLogin("github")}
        className="h-12 w-12 rounded-full bg-black p-2"
      >
        <Image
          src="/social/github.svg"
          alt="깃허브 로그인"
          width={48}
          height={48}
        />
      </button>
    </div>
  );
};

export default SocialLogin;
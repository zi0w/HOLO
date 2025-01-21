// components/SocialLogin.tsx
"use client";


import { useSocialLogin } from "@/app/sign-in/_hooks/useSocialLogin";
import githubimg from "@/assets/images/social-login/githubimg.png";
import googleimg from "@/assets/images/social-login/googleimg.png";
import kakaoimg from "@/assets/images/social-login/kakaoimg.png";
import Image from "next/image";

const SocialLogin = () => {
  const { handleSocialLogin } = useSocialLogin();

  return (
    <div className="flex items-center justify-center space-x-[24px]">
      <button
        onClick={() => handleSocialLogin("kakao")}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
      >
        <Image
          src={kakaoimg}
          alt="카카오 로그인"
          width={48}
          height={48}
          className="object-contain"
        />
      </button>
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
      >
        <Image
          src={googleimg}
          alt="구글 로그인"
          width={48}
          height={48}
          className="object-contain"
        />
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
      >
        <Image
          src={githubimg}
          alt="깃허브 로그인"
          width={48}
          height={48}
          className="object-cover"
        />
      </button>
    </div>
  );
};

export default SocialLogin;

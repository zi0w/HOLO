"use client";

import { useSocialLogin } from "@/app/sign-in/_hooks/useSocialLogin";
import GithubIcon from "@/assets/images/social-login/githubimg.svg";
import GoogleIcon from "@/assets/images/social-login/googleimg.svg";
import KakaoIcon from "@/assets/images/social-login/kakaoimg.svg";

const SocialLogin = () => {
  const { handleSocialLogin } = useSocialLogin();

  return (
    <div className="flex items-center justify-center space-x-6">
      <button
        onClick={() => handleSocialLogin("kakao")}
        className="flex h-12 w-12 items-center justify-center rounded-full"
      >
        <KakaoIcon width={48} height={48} className="h-12 w-12" />
      </button>
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex h-12 w-12 items-center justify-center rounded-full"
      >
        <GoogleIcon width={48} height={48} className="object-cover" />
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex h-12 w-12 items-center justify-center rounded-full"
      >
        <GithubIcon width={48} height={48} className="object-cover" />
      </button>
    </div>
  );
  
};

export default SocialLogin;





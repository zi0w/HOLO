"use client";

import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기

const SocialLogin: React.FC = () => {
  const supabase = createClient(); // Supabase 클라이언트 초기화

  // 소셜 로그인 처리 함수
  const handleSocialLogin = async (provider: "github" | "google" | "kakao") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) {
        console.error("소셜 로그인 실패했습니다:", error.message);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      alert(`${provider} 로그인 요청이 완료되었습니다. 인증을 확인하세요.`);
    } catch (error) {
      console.error(`${provider} 로그인 처리 중 오류:`, error);
      alert("시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      {/* GitHub 로그인 버튼 */}
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-white"
        onClick={() => handleSocialLogin("github")}
      >
        GitHub
      </button>

      {/* Google 로그인 버튼 */}
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white"
        onClick={() => handleSocialLogin("google")}
      >
        Google
      </button>

      {/* Kakao 로그인 버튼 */}
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black"
        onClick={() => handleSocialLogin("kakao")}
      >
        Kakao
      </button>
    </div>
  );
};

export default SocialLogin;

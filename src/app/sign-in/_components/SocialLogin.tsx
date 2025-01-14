"use client";

import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기

const SocialLogin: React.FC = () => {
  const supabase = createClient(); // Supabase 클라이언트 초기화

  // 소셜 로그인 처리 함수
  const handleSocialLogin = async (provider: "github" | "google" | "kakao") => {
    try {
      // Supabase를 이용하여 OAuth 로그인 요청
      const { error } = await supabase.auth.signInWithOAuth({
        provider, // GitHub, Google, Kakao 중 하나의 제공자를 사용
        options: {
          redirectTo: "http://localhost:3000/api/auth/callback", // 인증 완료 후 리디렉션할 URL
          queryParams: {
            access_type: "offline", // OAuth에서 장기 인증 토큰을 요청
            prompt: "select_account", // 매번 사용자 동의를 요청하여 계정 선택창 표시
          },
        },
      });

      if (error) {
        console.error("소셜 로그인 실패:", error.message);
      }

      // 로그인 실패 시 에러 처리
      if (error) {
        console.error(`${provider} 로그인 중 오류 발생:`, error.message);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      alert(`${provider} 로그인 요청이 완료되었습니다. 인증을 확인하세요.`);
    } catch (error) {
      console.error(`${provider} 로그인 처리 중 오류:`, error);
      alert("시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // 페이지 로드 시 인증 상태 확인
  
  return (
    <div className="flex flex-col space-y-4">
      {/* GitHub 로그인 버튼 */}
      <button
        className="h-12 w-full rounded bg-gray-800 text-white"
        onClick={() => handleSocialLogin("github")}
      >
        GitHub
      </button>

      {/* Google 로그인 버튼 */}
      <button
        className="h-12 w-full rounded bg-red-500 text-white"
        onClick={() => handleSocialLogin("google")}
      >
        Google
      </button>

      {/* Kakao 로그인 버튼 */}
      <button
        className="h-12 w-full rounded bg-yellow-400 text-black"
        onClick={() => handleSocialLogin("kakao")}
      >
        Kakao
      </button>
    </div>
  );
};

export default SocialLogin;

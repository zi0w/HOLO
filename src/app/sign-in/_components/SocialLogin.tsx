"use client";

import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기
import useAuthStore from "@/store/authStore"; // Zustand 스토어 가져오기
import { useRouter } from "next/navigation"; // Next.js 라우터 가져오기
import React from "react";

const supabase = createClient(); // Supabase 클라이언트 초기화

const SocialLogin: React.FC = () => {
  const setAuth = useAuthStore((state) => state.setAuth); // Zustand의 `setAuth` 함수 가져오기
  const router = useRouter(); // 리디렉션 처리용 라우터

  // 소셜 로그인 처리 함수
  const handleSocialLogin = async (provider: "github" | "google" | "kakao") => {
    try {
      // Supabase를 이용하여 OAuth 로그인 요청
      const { error } = await supabase.auth.signInWithOAuth({
        provider, // GitHub, Google, Kakao 중 하나의 제공자를 사용
        options: {
          redirectTo: "http://localhost:3000/api/auth/callback", // 인증 완료 후 리디렉션할 URL
        },
      });

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
  React.useEffect(() => {
    const checkAuthState = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("세션 정보 가져오기 실패:", error.message);
        return;
      }

      if (data.session) {
        const { user, access_token, refresh_token } = data.session;

        // 닉네임 설정: 소셜 제공자의 닉네임 또는 기본값 설정
        const nickname =
          user.user_metadata?.nickname ??
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          "익명 사용자";

        // Zustand 상태 업데이트
        setAuth(
          {
            id: user.id,
            email: user.email ?? "",
            nickname: nickname,
            profile_image_url: user.user_metadata?.avatar_url ?? null,
          },
          {
            accessToken: access_token,
            refreshToken: refresh_token,
          },
        );

        // 상태를 로컬 스토리지에 저장
        localStorage.setItem(
          "auth-storage",
          JSON.stringify({
            user: {
              id: user.id,
              email: user.email ?? "",
              nickname: nickname,
              profile_image_url: user.user_metadata?.avatar_url ?? null,
            },
            session: {
              accessToken: access_token,
              refreshToken: refresh_token,
            },
          }),
        );

        alert("로그인 성공!");
        router.push("/sign-in"); // 로그인 페이지로 이동
      }
    };

    checkAuthState();
  }, [setAuth, router]);

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

"use client";

import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기
import useAuthStore from "@/store/authStore";
import { Session } from "@supabase/supabase-js"; // Supabase의 Session 타입 가져오기
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const supabase = createClient(); // Supabase 클라이언트 초기화

    const checkAuthState = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("세션 정보 가져오기 실패했습니다.:", error.message);
        return;
      }

      if (data.session) {
        const { user, access_token, refresh_token, expires_in, token_type } =
          data.session;

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
            access_token,
            refresh_token,
            expires_in,
            token_type,
            user, // 사용자 정보도 포함
          } as Session, // Session 타입으로 명시적으로 캐스팅
        );

        // alert("로그인 성공!");
        // router.push("/"); // 로그인 페이지로 이동
      }
    };

    checkAuthState();
  }, [setAuth, router]); // supabase.auth는 필요하지 않음
};

export default useCheckAuth;

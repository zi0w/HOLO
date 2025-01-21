"use client";


import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기
import AuthStore from "@/store/authStore"; // Zustand 스토어 가져오기
import { useMutation, UseMutationResult } from "@tanstack/react-query"; // React Query 가져오기
import { useRouter } from "next/navigation"; // Next.js 라우터 가져오기
import { Session } from "@supabase/supabase-js"; // Supabase의 Session 타입 가져오기
import type { SignInPayload } from "@/app/sign-in/_types/Sign-in.type";
import type { User } from "@/app/sign-in/_types/UserType";


export type SignInResult = {
  user: Record<string, string> | null; // 사용자 정보
  session: Session; // 세션 정보
};

const supabase = createClient(); // Supabase 클라이언트 초기화

const useSignInMutation = (): UseMutationResult<
  SignInResult,
  unknown,
  SignInPayload
> => {
  const router = useRouter();
  const setAuth = AuthStore((state) => state.setAuth); // Zustand 상태 변경 함수 가져오기

  return useMutation<SignInResult, unknown, SignInPayload>({
    mutationFn: async ({ email, password }: SignInPayload) => {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지 JSON으로 파싱
        throw new Error(errorData.errorMsg || "로그인에 실패했습니다.");
      }

      return response.json(); // JSON 응답 반환
    },

    onSuccess: async (data) => {
      const { session, user } = data;

      if (session && session.access_token) {
        document.cookie = `access_token=${session.access_token}; path=/; secure;`; // 세션 쿠키 설정
        console.log(
          "엑세스 토큰이 쿠키에 저장되었습니다:",
          session.access_token,
        );
      } else {
        console.error("세션 또는 엑세스 토큰이 없습니다.");
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        return; // 추후에 리팩토링 예정
      }

      if (user) {
        try {
          const { data: userDetails, error } = await fetchUserDetails(user.id);

          if (error) {
            throw new Error("유저 정보를 가져오는 중 오류가 발생했습니다.");
          }

          setAuth(userDetails as User, session); // 세션 객체를 그대로 전달

          alert("로그인 성공");
          router.push("/");
        } catch (error) {
          console.error("유저 정보 업데이트 실패:", error);
          alert("오류 발생");
        }
      }
    },

    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "로그인에 실패했습니다.";
      alert(errorMessage);
    },
  });
};

// 유저 상세 정보를 가져오는 함수
const fetchUserDetails = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
};

export default useSignInMutation;





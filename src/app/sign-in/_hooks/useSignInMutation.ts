"use client";

import type { SignInPayload } from "@/app/sign-in/_types/signInType";

import { createClient } from "@/lib/utils/supabase/client";
import AuthStore, { type User } from "@/store/authStore";
import { Session } from "@supabase/supabase-js";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type SignInResult = {
  user: Record<string, string> | null;
  session: Session;
};

const supabase = createClient();

const useSignInMutation = (): UseMutationResult<
  SignInResult,
  unknown,
  SignInPayload
> => {
  const router = useRouter();
  const setAuth = AuthStore((state) => state.setAuth);

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
        const errorData = await response.json();
        // Invalid login credentials 에러 처리
        if (errorData.error === "Invalid login credentials") {
          throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
        // 기타 에러 처리
        throw new Error(errorData.errorMsg || "로그인에 실패했습니다.");
      }

      return response.json();
    },

    onSuccess: async (data) => {
      const { session, user } = data;

      // 세션 및 토큰 검증
      if (!session?.access_token) {
        console.error("세션 또는 엑세스 토큰이 없습니다.");
        // alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      // 토큰 저장
      document.cookie = `access_token=${session.access_token}; path=/; secure;`;
      console.log("엑세스 토큰이 쿠키에 저장되었습니다:", session.access_token);

      // 사용자 정보 검증
      if (!user) {
        console.error("사용자 정보가 없습니다.");
        alert("사용자 정보를 찾을 수 없습니다.");
        return;
      }

      try {
        // 사용자 상세 정보 조회
        const { data: userDetails, error } = await fetchUserDetails(user.id);

        if (error) {
          console.error("사용자 정보 조회 실패:", error);
          throw new Error("유저 정보를 가져오는 중 오류가 발생했습니다.");
        }

        if (!userDetails) {
          throw new Error("사용자 정보가 존재하지 않습니다.");
        }

        // 상태 업데이트 및 리다이렉트
        setAuth(userDetails as User, session);
        // alert("로그인 성공");
        router.push("/");
      } catch (error) {
        console.error("유저 정보 업데이트 실패:", error);
        alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
      }
    },

    onError: (error) => {
      // 에러 메시지를 사용자 친화적으로 변환
      const errorMessage = error instanceof Error ? error.message : "로그인에 실패했습니다.";
      const userFriendlyMessage = {
        "이메일 또는 비밀번호가 일치하지 않습니다.": "이메일 또는 비밀번호를 다시 확인해주세요.",
        "유저 정보를 가져오는 중 오류가 발생했습니다.": "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        "사용자 정보가 존재하지 않습니다.": "계정 정보를 찾을 수 없습니다. 회원가입을 해주세요."
      }[errorMessage] || errorMessage;

      alert(userFriendlyMessage);
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




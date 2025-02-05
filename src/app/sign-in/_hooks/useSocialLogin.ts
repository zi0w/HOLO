"use client";
import { createClient } from "@/lib/utils/supabase/client";

type SocialProvider = "github" | "google" | "kakao";

export const useSocialLogin = () => {
  const supabase = createClient();

  const handleSocialLogin = async (provider: SocialProvider) => {
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

      if (error) throw error;
    } catch (error) {
      console.error(`${provider} 로그인 처리 중 오류:`, error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { handleSocialLogin };
};

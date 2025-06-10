"use client";

import { createClient } from "@/lib/utils/supabase/client"; 
import useAuthStore from "@/store/useAuthStore";
import { Session } from "@supabase/supabase-js"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const supabase = createClient(); 

    const checkAuthState = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("세션 정보 가져오기 실패했습니다.:", error.message);
        return;
      }

      if (data.session) {
        const { user, access_token, refresh_token, expires_in, token_type } =
          data.session;

        
        const nickname =
          user.user_metadata?.nickname ??
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          "익명 사용자";

        
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
            user, 
          } as Session, 
        );

       
      }
    };

    checkAuthState();
  }, [setAuth, router]); 
};

export default useCheckAuth;

import useAuthStore from '@/store/authStore';
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기
import { useRouter } from "next/navigation"; 
import { useEffect } from 'react';

const useCheckAuth = () => {
    const router = useRouter(); 
    const supabase = createClient(); // Supabase 클라이언트 초기화
     const setAuth = useAuthStore((state) => state.setAuth);
    useEffect(() => {
        const checkAuthState = async () => {
          const { data, error } = await supabase.auth.getSession();
    
          if (error) {
            console.error("세션 정보 가져오기 실패했습니다.:", error.message);
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
            // localStorage.setItem(
            //   "auth-storage",
            //   JSON.stringify({
            //     user: {
            //       id: user.id,
            //       email: user.email ?? "",
            //       nickname: nickname,
            //       profile_image_url: user.user_metadata?.avatar_url ?? null,
            //     },
            //     session: {
            //       accessToken: access_token,
            //       refreshToken: refresh_token,          //통일성있게  추후에 주스텐스 퍼시스트로 상태관리
            //     },
            //   }),
            // );
    
            // alert("로그인 성공!");
            // router.push("/"); // 로그인 페이지로 이동
          }
        };
    
        checkAuthState();
      }, [setAuth, router]);
    
}

export default useCheckAuth

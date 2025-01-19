import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const supabase = createClient();

type SignUpData = {
  email: string;
  password: string;
  nickname: string;
}

// 보안을 위해 비밀번호를 제외한 타입 정의
// type UserData = Omit<SignUpData, 'password'>;

export const useSignUpMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpData) => {
      // 회원가입 처리
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      // 사용자 프로필 정보 저장 (비밀번호 제외)
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user?.id,
          email: data.email,
          nickname: data.nickname,
        }]);

      if (profileError) throw profileError;

      return authData;
    },
    onSuccess: () => {
      router.push('/sign-in');
    },
    onError: (error) => {
      console.error('회원가입 중 오류:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });
}; 
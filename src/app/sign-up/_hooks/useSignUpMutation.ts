// src/app/sign-up/_hooks/UseSignUpMutation.ts
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SignUpPayload } from "../_types/SignupType";
import type { Database } from "@/lib/types/supabase";

const supabase = createClient();

export const useSignUpMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpPayload) => {
      try {
        // 1. 회원가입 처리
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              nickname: data.nickname,
              ...(data.profile_image_url && { profile_image_url: data.profile_image_url })
            }
          }
        });

        if (authError) {
          if (authError.message.includes('already registered')) {
            throw new Error('이미 가입된 이메일입니다.');
          }
          throw authError;
        }

        if (!authData.user?.id) {
          throw new Error('사용자 ID를 생성할 수 없습니다.');
        }

        // 2. 기존 사용자 확인
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', authData.user.id)
          .single();

        if (existingUser) {
          // 이미 존재하는 사용자면 업데이트
          const { error: updateError } = await supabase
            .from('users')
            .update({
              email: data.email,
              nickname: data.nickname,
              ...(data.profile_image_url && { profile_image_url: data.profile_image_url })
            })
            .eq('id', authData.user.id);

          if (updateError) {
            throw updateError;
          }
        } else {
          // 새로운 사용자면 삽입
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: data.email,
              nickname: data.nickname,
              ...(data.profile_image_url && { profile_image_url: data.profile_image_url })
            } satisfies Database['public']['Tables']['users']['Insert']);

          if (insertError) {
            if (insertError.code === '23505') {
              if (insertError.message.includes('email')) {
                throw new Error('이미 사용 중인 이메일입니다.');
              }
              if (insertError.message.includes('nickname')) {
                throw new Error('이미 사용 중인 닉네임입니다.');
              }
            }
            // 프로필 저장 실패 시 auth 사용자 삭제
            await supabase.auth.signOut();
            throw insertError;
          }
        }

        return authData;
      } catch (error) {
        console.error('Signup error:', error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('회원가입 처리 중 오류가 발생했습니다.');
      }
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.push('/sign-in');
    },
    onError: (error: Error) => {
      console.error('회원가입 중 오류:', error);
      alert(error.message);
    },
  });
};




// // src/app/sign-up/_hooks/UseSignUpMutation.ts
// import { createClient } from "@/lib/utils/supabase/client";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import type { SignUpPayload } from "../_types/SignupType";

// const supabase = createClient();

// export const useSignUpMutation = () => {
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (data: SignUpPayload) => {
//       try {
//         // 1. 이메일 중복 체크
//         const { data: existingUser } = await supabase
//           .from('users')
//           .select('email')
//           .eq('email', data.email)
//           .single();

//         if (existingUser) {
//           throw new Error('이미 사용 중인 이메일입니다.');
//         }

//         // 2. 닉네임 중복 체크
//         const { data: existingNickname } = await supabase
//           .from('users')
//           .select('nickname')
//           .eq('nickname', data.nickname)
//           .single();

//         if (existingNickname) {
//           throw new Error('이미 사용 중인 닉네임입니다.');
//         }

//         // 3. 회원가입 처리
//         const { data: authData, error: authError } = await supabase.auth.signUp({
//           email: data.email,
//           password: data.password,
//           options: {
//             data: {
//               nickname: data.nickname,
//               ...(data.profile_image_url && { profile_image_url: data.profile_image_url })
//             }
//           }
//         });

//         if (authError) throw authError;
//         if (!authData.user?.id) throw new Error('사용자 ID를 생성할 수 없습니다.');

//         // 4. 사용자 프로필 정보 저장 시도
//         const { error: profileError } = await supabase
//           .from('users')
//           .upsert([{
//             id: authData.user.id,
//             email: data.email,
//             nickname: data.nickname,
//             ...(data.profile_image_url && { profile_image_url: data.profile_image_url })
//           }], {
//             onConflict: 'id',
//             ignoreDuplicates: false
//           });

//         if (profileError) {
//           // 프로필 저장 실패 시 auth 사용자 삭제 시도
//           await supabase.auth.signOut();
//           const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id);
//           if (deleteError) {
//             console.error('Failed to cleanup auth user:', deleteError);
//           }
//           throw profileError;
//         }

//         return authData;
//       } catch (error) {
//         // 에러 발생 시 정리 작업
//         if (error instanceof Error) {
//           throw error;
//         }
//         throw new Error('회원가입 처리 중 오류가 발생했습니다.');
//       }
//     },
//     onSuccess: () => {
//       alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
//       router.push('/sign-in');
//     },
//     onError: (error: Error) => {
//       console.error('회원가입 중 오류:', error);
//       if (error.message.includes('이미 사용 중인')) {
//         alert(error.message);
//       } else {
//         alert('회원가입에 실패했습니다. 다시 시도해주세요.');
//       }
//     },
//   });
// };



// // src/app/sign-up/_hooks/UseSignUpMutation.ts
// import { createClient } from "@/lib/utils/supabase/client";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import type { SignUpPayload } from "../_types/SignupType";

// const supabase = createClient();

// export const useSignUpMutation = () => {
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (data: SignUpPayload) => {
//       // 회원가입 처리
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: data.email,
//         password: data.password,
//       });

//       if (authError) throw authError;

//       // 사용자 프로필 정보 저장
//       const { error: profileError } = await supabase
//         .from('users')
//         .insert([{
//           id: authData.user?.id,
//           email: data.email,
//           nickname: data.nickname,
//           ...(data.profile_image_url && { profile_image_url: data.profile_image_url }),
//         }]);

//       if (profileError) throw profileError;

//       return authData;
//     },
//     onSuccess: () => {
//       alert("회원가입 성공");
//       router.push('/sign-in');
//     },
//     onError: (error) => {
//       console.error('회원가입 중 오류:', error);
//       alert('회원가입에 실패했습니다. 다시 시도해주세요.');
//     },
//   });
// };




// import { createClient } from "@/lib/utils/supabase/client";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

// const supabase = createClient();

// type SignUpData = {
//   email: string;
//   password: string;
//   nickname: string;
// }

// // 보안을 위해 비밀번호를 제외한 타입 정의
// // type UserData = Omit<SignUpData, 'password'>;

// export const useSignUpMutation = () => {
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (data: SignUpData) => {
//       // 회원가입 처리
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: data.email,
//         password: data.password,
//       });

//       if (authError) throw authError;

//       // 사용자 프로필 정보 저장 (비밀번호 제외)
//       const { error: profileError } = await supabase
//         .from('users')
//         .insert([{
//           id: authData.user?.id,
//           email: data.email,
//           nickname: data.nickname,
//         }]);

//       if (profileError) throw profileError;

//       return authData;
//     },
//     onSuccess: () => {
//       router.push('/sign-in');
//     },
//     onError: (error) => {
//       console.error('회원가입 중 오류:', error);
//       alert('회원가입에 실패했습니다. 다시 시도해주세요.');
//     },
//   });
// }; 
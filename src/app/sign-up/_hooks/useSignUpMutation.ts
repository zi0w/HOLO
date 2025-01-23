import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SignUpPayload } from "../_types/signupType";
import { useState } from "react";

const supabase = createClient();

export const useSignUpMutation = () => {
  const router = useRouter();
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: ""
  });

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (modalState.message === "회원가입이 완료되었습니다.") {
      router.push("/sign-in");
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: SignUpPayload) => {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: data.email,
            password: data.password,
            options: {
              data: {
                nickname: data.nickname,
                ...(data.profile_image_url && {
                  profile_image_url: data.profile_image_url,
                }),
              },
            },
          },
        );

        if (authError) {
          if (authError.message.includes("already registered")) {
            throw new Error("이미 가입된 이메일입니다.");
          }
          throw authError;
        }

        if (!authData.user?.id) {
          throw new Error("사용자 ID를 생성할 수 없습니다.");
        }

        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", authData.user.id)
          .single();

        if (existingUser) {
          const { error: updateError } = await supabase
            .from("users")
            .update({
              email: data.email,
              nickname: data.nickname,
              ...(data.profile_image_url && {
                profile_image_url: data.profile_image_url,
              }),
            })
            .eq("id", authData.user.id);

          if (updateError) {
            throw updateError;
          }
        } else {
          const { error: insertError } = await supabase.from("users").insert({
            id: authData.user.id,
            email: data.email,
            nickname: data.nickname,
            ...(data.profile_image_url && {
              profile_image_url: data.profile_image_url,
            }),
          } satisfies Database["public"]["Tables"]["users"]["Insert"]);

          if (insertError) {
            if (insertError.code === "23505") {
              if (insertError.message.includes("email")) {
                throw new Error("이미 사용 중인 이메일입니다.");
              }
              if (insertError.message.includes("nickname")) {
                throw new Error("이미 사용 중인 닉네임입니다.");
              }
            }
            await supabase.auth.signOut();
            throw insertError;
          }
        }

        return authData;
      } catch (error) {
        console.error("Signup error:", error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("회원가입 처리 중 오류가 발생했습니다.");
      }
    },
    onSuccess: () => {
      setModalState({
        isOpen: true,
        message: "회원가입이 완료되었습니다."
      });
    },
    onError: (error: Error) => {
      console.error("회원가입 중 오류:", error);
      setModalState({
        isOpen: true,
        message: error.message
      });
    },
  });

  return {
    ...mutation,
    modalState,
    closeModal
  };
};


// import type { Database } from "@/lib/types/supabase";
// import { createClient } from "@/lib/utils/supabase/client";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import type { SignUpPayload } from "../_types/signupType";
// import { useState } from "react";

// const supabase = createClient();

// export const useSignUpMutation = () => {
//   const router = useRouter();
//   const [modalState, setModalState] = useState({
//     isOpen: false,
//     message: ""
//   });

//   const closeModal = () => {
//     setModalState(prev => ({ ...prev, isOpen: false }));
//     if (modalState.message === "회원가입이 완료되었습니다.") {
//       router.push("/sign-in");
//     }
//   };

//   const mutation = useMutation({
//     mutationFn: async (data: SignUpPayload) => {
//       try {
//         const { data: authData, error: authError } = await supabase.auth.signUp(
//           {
//             email: data.email,
//             password: data.password,
//             options: {
//               data: {
//                 nickname: data.nickname,
//                 ...(data.profile_image_url && {
//                   profile_image_url: data.profile_image_url,
//                 }),
//               },
//             },
//           },
//         );

//         if (authError) {
//           if (authError.message.includes("already registered")) {
//             throw new Error("이미 가입된 이메일입니다.");
//           }
//           throw authError;
//         }

//         if (!authData.user?.id) {
//           throw new Error("사용자 ID를 생성할 수 없습니다.");
//         }

//         const { data: existingUser } = await supabase
//           .from("users")
//           .select("id")
//           .eq("id", authData.user.id)
//           .single();

//         if (existingUser) {
//           const { error: updateError } = await supabase
//             .from("users")
//             .update({
//               email: data.email,
//               nickname: data.nickname,
//               ...(data.profile_image_url && {
//                 profile_image_url: data.profile_image_url,
//               }),
//             })
//             .eq("id", authData.user.id);

//           if (updateError) {
//             throw updateError;
//           }
//         } else {
//           const { error: insertError } = await supabase.from("users").insert({
//             id: authData.user.id,
//             email: data.email,
//             nickname: data.nickname,
//             ...(data.profile_image_url && {
//               profile_image_url: data.profile_image_url,
//             }),
//           } satisfies Database["public"]["Tables"]["users"]["Insert"]);

//           if (insertError) {
//             if (insertError.code === "23505") {
//               if (insertError.message.includes("email")) {
//                 throw new Error("이미 사용 중인 이메일입니다.");
//               }
//               if (insertError.message.includes("nickname")) {
//                 throw new Error("이미 사용 중인 닉네임입니다.");
//               }
//             }
//             await supabase.auth.signOut();
//             throw insertError;
//           }
//         }

//         return authData;
//       } catch (error) {
//         console.error("Signup error:", error);
//         if (error instanceof Error) {
//           throw error;
//         }
//         throw new Error("회원가입 처리 중 오류가 발생했습니다.");
//       }
//     },
//     onSuccess: () => {
//       setModalState({
//         isOpen: true,
//         message: "회원가입이 완료되었습니다."
//       });
//     },
//     onError: (error: Error) => {
//       console.error("회원가입 중 오류:", error);
//       setModalState({
//         isOpen: true,
//         message: error.message
//       });
//     },
//   });

//   return {
//     ...mutation,
//     modalState,
//     closeModal
//   };
// };




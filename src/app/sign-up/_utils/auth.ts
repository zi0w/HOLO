"use client";
import { createClient } from "@/lib/utils/supabase/client";
import { Session } from "@supabase/supabase-js";

const supabase = createClient();

export type SignUpData = {
  email: string;
  password: string;
  nickname: string;
  profile_image_url: string;
};

export type Users = {
  email: string;
  nickname: string;
  profile_image_url: string;
};

export type SignUpResult = {
  user: Users;
  session: Session | null;
  message: string;
};

export const signUp = async ({
  email,
  password,
  nickname,
}: SignUpData): Promise<SignUpResult> => {
  // Supabase에 회원가입 요청
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  if (error) {
    throw new Error("회원가입 실패: " + error.message);
  }

  if (!data?.user) {
    throw new Error("사용자 데이터가 생성되지 않았습니다");
  }

  // 트리거에서 처리되므로 사용자 정보를 별도로 저장하지 않음
  return {
    message: "회원가입이 완료되었습니다",
    user: {
      email,
      nickname,
      profile_image_url: "", // 필요 시 값을 채워넣으세요
    },
    session: data.session,
  };
};

// "use client";
// import { createClient } from "@/lib/utils/supabase/client";
// import { Session } from "@supabase/supabase-js";

// const supabase = createClient();

// export type SignUpData = {
//   email: string;
//   password: string;
//   nickname: string;
//   profile_image_url: string;
// };

// export type Users = {
//   email: string;
//   nickname: string;
//   profile_image_url: string;
// };

// export type SignUpResult = {
//   user: Users;
//   session: Session | null;
//   message: string;
// };

// export const signUp = async ({
//   email,
//   password,
//   nickname,
// }: SignUpData): Promise<SignUpResult> => {
//   // Supabase에 회원가입 요청
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         nickname,
//       },
//     },
//   });

//   if (error) {
//     throw new Error("회원가입 실패: " + error.message);
//   }

//   if (!data?.user) {
//     throw new Error("사용자 데이터가 생성되지 않았습니다");
//   }
// //콘솔로그로 51 번재줄 찾아서  51 번째줄 알맞게 지워주기
//   // 사용자 정보를 'users' 테이블에 저장
//   const { data: ddd, error: dbError } = await supabase.from("users").insert([
//     {
//       email,
//       nickname,
//     },
//   ]);

//   if (dbError) {
//     throw new Error("사용자 데이터 저장 실패: " + dbError.message);
//   }
//   console.log(data);
//   return {
//     message: "회원가입이 완료되었습니다",
//     user: ddd!,
//     session: data.session,

//   };
// };

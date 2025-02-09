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

  
  return {
    message: "회원가입이 완료되었습니다",
    user: {
      email,
      nickname,
      profile_image_url: "", 
    },
    session: data.session,
  };
};


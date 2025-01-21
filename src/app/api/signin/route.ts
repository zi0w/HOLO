"use server";
import { createClient } from "@/lib/utils/supabase/server"; 
import { NextResponse } from "next/server"; 

export const POST = async (request: Request) => {
  const supabase = await createClient(); 

  const { email, password } = await request.json(); 

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase 인증 오류:", error.message);
      return NextResponse.json({ errorMsg: error.message }, { status: 401 }); 
    }

    
    return NextResponse.json(
      {
        message: "로그인에 성공했습니다",
        user: data.user,
        session: data.session,
      }, 
      { status: 200 },
    );
  } catch (error) {
    console.error("서버 에러:", error);
    return NextResponse.json(
      { errorMsg: "서버에서 문제가 발생했습니다. 다시 시도해 주세요." }, 
      { status: 500 },
    );
  }
};












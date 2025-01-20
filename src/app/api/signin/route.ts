"use server";
import { createClient } from "@/lib/utils/supabase/server"; // Supabase 클라이언트 생성 함수 가져오기
import { NextResponse } from "next/server"; // Next.js의 응답 객체 가져오기

// POST 요청을 처리하는 화살표 함수
export const POST = async (request: Request) => {
  const supabase = await createClient(); // Supabase 클라이언트 초기화

  const { email, password } = await request.json(); // 요청 본문에서 이메일과 비밀번호 추출

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase 인증 오류:", error.message);
      return NextResponse.json({ errorMsg: error.message }, { status: 401 }); // 인증 오류 시 401 상태 코드 반환
    }

    // 세션 정보와 사용자 정보를 포함하여 응답
    return NextResponse.json(
      {
        message: "로그인에 성공했습니다",
        user: data.user,
        session: data.session,
      }, // 성공 시 사용자 정보와 세션 반환
      { status: 200 },
    );
  } catch (error) {
    console.error("서버 에러:", error);
    return NextResponse.json(
      { errorMsg: "서버에서 문제가 발생했습니다. 다시 시도해 주세요." }, // 서버 오류 시 500 상태 코드 반환
      { status: 500 },
    );
  }
};












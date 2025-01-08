// // pages/api/sign-up.ts

// import { NextResponse } from "next/server";

// export const POST = async (request: Request) => {
//   const supabase = createClient();
//   try {
//     const body = await request.json();
//     const { email, password, nickname } = body;

//     // Supabase에 회원가입 요청
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           nickname,
//         },
//       },
//     });

//     if (error) {
//       throw new Error("회원가입 실패: " + error.message);
//     }

//     if (!data?.user) {
//       throw new Error("사용자 데이터가 생성되지 않았습니다");
//     }

//     // 사용자 정보를 'users' 테이블에 저장
//     const { error: dbError } = await supabase.from("users").insert({
//       email: data.user.id,
//       nickname,
//       profile_img:
//         "https://qxytgvrleqpskxcfuvja.supabase.co/storage/v1/object/public/profile_images/default_profile_img.webp",
//     });

//     if (dbError) {
//       throw new Error("사용자 데이터 저장 실패: " + dbError.message);
//     }

//     // 세션 정보 가져오기
//     const { data: sessionData, error: sessionError } =
//       await supabase.auth.getSession();

//     if (sessionError) {
//       throw new Error(
//         "세션 정보를 가져오는 데 실패했습니다: " + sessionError.message,
//       );
//     }

//     console.log("signupUser 함수호출 user", data.user);

//     return NextResponse.json(
//       {
//         message: "회원가입이 완료되었습니다",
//         user: data.user,
//         session: sessionData.session,
//       },
//       { status: 200 },
//     );
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("서버 오류:", error.message);
//       return NextResponse.json(
//         { errorMsg: error.message || "서버에서 문제가 발생했습니다" },
//         { status: 500 },
//       );
//     } else {
//       console.error("서버 오류:", error);
//       return NextResponse.json(
//         { errorMsg: "서버에서 문제가 발생했습니다" },
//         { status: 500 },
//       );
//     }
//   }
// };

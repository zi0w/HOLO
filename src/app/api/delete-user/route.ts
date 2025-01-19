import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  console.log("회원 탈퇴 API 호출됨");
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        !supabaseUrl 
          ? "Supabase URL이 설정되지 않았습니다." 
          : "Service Role Key가 설정되지 않았습니다."
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { userId } = await request.json();
    console.log("삭제 요청된 userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    try {
      // 1. 좋아요 삭제
      await supabase.from("likes").delete().eq("user_id", userId);
      
      // 2. 댓글 삭제
      await supabase.from("comments").delete().eq("user_id", userId);
      
      // 3. 게시물 삭제
      await supabase.from("posts").delete().eq("user_id", userId);
      
      // 4. 사용자 프로필 삭제
      await supabase.from("users").delete().eq("id", userId);

      // 5. Auth 사용자 삭제 (중요!)
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      
      if (authError) {
        throw authError;
      }

      return NextResponse.json(
        { message: "회원 탈퇴가 완료되었습니다." },
        { status: 200 }
      );
    } catch (error) {
      console.error("데이터 삭제 중 오류:", error);
      throw error;
    }
  } catch (error) {
    console.error("최종 오류:", error);
    return NextResponse.json(
      { 
        error: "회원 탈퇴 처리 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
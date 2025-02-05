"use server";

import { createClient } from "@/lib/utils/supabase/server";


export async function signOutAction() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;


    return { success: true };
  } catch (error: unknown) {
    let errorMessage = "알 수 없는 오류가 발생했습니다.";
    if (error instanceof Error) {
      errorMessage = error.message || "로그아웃 중 문제가 발생했습니다.";
    }
    return { success: false, error: errorMessage };
  }
}

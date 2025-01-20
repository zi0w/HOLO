// src/app/mypage/_utils/profile.ts
import { createClient } from "@/lib/utils/supabase/client";

export const uploadProfileImage = async (file: File) => {
  const supabase = createClient();

  try {
    // 1. 현재 사용자 확인
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user?.id) {
      throw new Error("사용자 인증에 실패했습니다.");
    }

    const userId = userData.user.id;

    // 2. 이미지 파일 유효성 검사
    if (!file.type.startsWith("image/")) {
      throw new Error("이미지 파일만 업로드 가능합니다.");
    }

    // 3. 파일 크기 검사 (예: 5MB 제한)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기는 5MB를 초과할 수 없습니다.");
    }

    // 4. 이미지 업로드
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile_images")
      .upload(fileName, file);

    if (uploadError) {
      throw new Error("이미지 업로드에 실패했습니다.");
    }

    // 5. 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from("profile_images").getPublicUrl(fileName);

    if (!publicUrl) {
      throw new Error("이미지 URL 생성에 실패했습니다.");
    }

    // 6. 사용자 프로필 업데이트
    const { error: updateError } = await supabase
      .from("users")
      .update({ profile_image_url: publicUrl })
      .eq("id", userId);

    if (updateError) {
      throw new Error("프로필 이미지 업데이트에 실패했습니다.");
    }

    return { publicUrl };
  } catch (error) {
    console.error("프로필 이미지 업로드 중 오류:", error);
    throw error instanceof Error
      ? error
      : new Error("프로필 이미지 업로드 중 알 수 없는 오류가 발생했습니다.");
  }
};

export const deleteProfileImage = async (imageUrl: string) => {
  const supabase = createClient();

  try {
    // 1. 현재 사용자 확인
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user?.id) {
      throw new Error("사용자 인증에 실패했습니다.");
    }

    // 2. 이미지 파일명 추출
    const fileName = imageUrl.split("/").pop();
    if (!fileName) {
      throw new Error("잘못된 이미지 URL입니다.");
    }

    // 3. 스토리지에서 이미지 삭제
    const { error: deleteError } = await supabase.storage
      .from("profile_images")
      .remove([fileName]);

    if (deleteError) {
      throw new Error("이미지 삭제에 실패했습니다.");
    }

    // 4. 사용자 프로필 업데이트 (기본 이미지로)
    const { error: updateError } = await supabase
      .from("users")
      .update({
        profile_image_url: "https://your-default-image-url.jpg",
      })
      .eq("id", userData.user.id);

    if (updateError) {
      throw new Error("프로필 업데이트에 실패했습니다.");
    }

    return { success: true };
  } catch (error) {
    console.error("프로필 이미지 삭제 중 오류:", error);
    throw error instanceof Error
      ? error
      : new Error("프로필 이미지 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};


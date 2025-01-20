import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from "@/lib/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

// 포스트 데이터 불러오기
export const fetchPostsData = async () => {
  try {
    const { data: postsData, error } = await supabase
      .from("posts")
      .select(
        "*, users(nickname, profile_image_url), comments(count), likes(count)",
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    return postsData;
  } catch (error) {
    console.error("포스트 불러오기에 실패했습니다.", error);
    throw error;
  }
};

// 포스트 이미지 URL 불러오기
export const uploadPostImageFile = async (file: File) => {
  try {
    const { data: imageData, error: uploadError } = await supabase.storage
      .from("post_image")
      .upload(`${uuidv4()}.png`, file);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("post_image")
      .getPublicUrl(imageData.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("이미지 스토리지 저장에 실패했습니다.", error);
    throw error;
  }
};

type addPostProps = {
  newTitle: Post["title"];
  newContent: Post["content"];
  newPostImageUrl: Post["post_image_url"];
  newCategory: Post["categories"];
};

// 포스트 저장
export const addPost = async ({
  newTitle,
  newContent,
  newPostImageUrl,
  newCategory,
}: addPostProps) => {
  try {
    const user_id = await getId();

    if (!user_id) {
      throw new Error("유저 아이디를 찾을 수 없습니다.");
    }

    const { data: postsData, error } = await supabase
      .from("posts")
      .insert([
        {
          title: newTitle,
          content: newContent,
          post_image_url: newPostImageUrl,
          categories: newCategory,
          user_id: user_id,
        },
      ])
      .select();

    if (error) throw error;

    return postsData;
  } catch (error) {
    console.error("포스트 저장에 실패했습니다.", error);
    throw error;
  }
};

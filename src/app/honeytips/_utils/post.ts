import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from "@/lib/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export const fetchPostsData = async () => {
  const { data: postsData, error } = await supabase
    .from("posts")
    .select(
      "*, users(nickname, profile_image_url), comments(count), likes(count)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("포스트 불러오기에 실패했습니다.");
    throw error;
  }
  return postsData;
};

// 포스트 이미지 URL 가져오기
export const uploadPostImageFile = async (file: File) => {
  const { data: imageData, error: uploadError } = await supabase.storage
    .from("post_image")
    .upload(`${uuidv4()}.png`, file);

  if (uploadError) {
    console.error("이미지 스토리지 저장에 실패했습니다.");
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("post_image")
    .getPublicUrl(imageData.path);
  return publicUrlData.publicUrl;
};

type addPostProps = {
  newTitle: Post["title"];
  newContent: Post["content"];
  newPostImageUrl: Post["post_image_url"];
  newCategory: Post["categories"];
};

export const addPost = async ({
  newTitle,
  newContent,
  newPostImageUrl,
  newCategory,
}: addPostProps) => {
  const user_id = await getId();

  if (!user_id) {
    console.error("유저 아이디를 찾을 수 없습니다.");
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

  if (error) {
    console.error("게시물 저장에 실패했습니다.");
    throw error;
  }
  return postsData;
};

export const fetchBestPostsData = async () => {
  const { data: bestPostsData, error } = await supabase
    .from("posts")
    .select(
      "*, users(nickname, profile_image_url), comments(count), likes(count)",
    )
    .order("likes", { ascending: false })
    .limit(3);
  if (error) {
    console.error("베스트 포스트 불러오기에 실패했습니다.");
    throw error;
  }
  return bestPostsData;
};

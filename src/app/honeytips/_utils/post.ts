"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export const fetchPostsData = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(nickname, profile_image_url)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("코멘트 불러오기 실패!");
    throw error;
  }
  return data;
};

// 포스트 이미지 URL 가져오기
export const uploadPostImageFile = async (file: File) => {
  const { data: imageData, error: uploadError } = await supabase.storage
    .from("post_image")
    .upload(`${uuidv4()}.png`, file);

  if (uploadError) {
    console.error("uploadError", uploadError);
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("post_image")
    .getPublicUrl(imageData.path);
  console.log("publicUrl", publicUrlData.publicUrl);
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
  const user_id = "9826a705-38ce-4a07-b0dc-cbfb251355e3";
  const { data, error } = await supabase
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
    console.error("게시물 저장 실패!");
    throw error;
  }

  console.log("게시물 저장 성공:", data);
  return data;
};

"use server";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type updatePostProps = {
  updatedTitle: Post["title"];
  updatedContent: Post["content"];
  updatedPostImageUrl: Post["post_image_url"];
  updatedCategory: Post["categories"];
  postId: Post["id"];
  userId: Post["user_id"];
};

export const updatePost = async ({
  postId,
  updatedTitle,
  updatedContent,
  updatedPostImageUrl,
  updatedCategory,
  userId,
}: updatePostProps) => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("posts")
      .update({
        title: updatedTitle,
        content: updatedContent,
        post_image_url: updatedPostImageUrl,
        categories: updatedCategory,
        user_id: userId,
      })
      .eq("id", postId)
      .select();

    if (error) {
      console.error("포스트 업데이트에 실패했습니다.", error);
      throw error;
    }

    revalidatePath(`/honeytips/${postId}`);
    redirect(`/honeytips/${postId}`);
  } catch (error) {
    console.error("포스트 업데이트 중 에러가 발생했습니다.", error);
    throw error;
  }
};

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
  const supabase = await createClient();

  await supabase
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

  revalidatePath(`/honeytips/${postId}`);
  redirect(`/honeytips/${postId}`);
};

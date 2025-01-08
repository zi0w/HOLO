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
};

export const updatePost = async ({
  postId,
  updatedTitle,
  updatedContent,
  updatedPostImageUrl,
  updatedCategory,
}: updatePostProps) => {
  const supabase = await createClient();
  const user_id = "9826a705-38ce-4a07-b0dc-cbfb251355e3";
  await supabase
    .from("posts")
    .update({
      title: updatedTitle,
      content: updatedContent,
      post_image_url: updatedPostImageUrl,
      categories: updatedCategory,
      user_id: user_id,
    })
    .eq("id", postId)
    .select();

  revalidatePath(`/honeytips/${postId}`);
  redirect(`/honeytips/${postId}`);
};

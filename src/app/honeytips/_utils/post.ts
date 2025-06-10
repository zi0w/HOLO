import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from "@/lib/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

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

export const uploadPostImageFile = async (file: File) => {
  try {
    const compressedFile = await convertImageFormat(file, "image/webp");

    const { data: imageData, error: uploadError } = await supabase.storage
      .from("post_image")
      .upload(`${uuidv4()}.webp`, compressedFile);

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

const convertImageFormat = (file: File, format: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: format,
              lastModified: file.lastModified,
            });
            resolve(compressedFile);
          } else {
            reject("Blob conversion failed.");
          }
        },
        format,
        0.7,
      );
    };
  });
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

"use client";

import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 좋아요 불러오기
export const fetchLikesData = async (postId: Like["post_id"]) => {
  const user_id = await getId();
  const { data: likesData, error } = await supabase
    .from("likes")
    .select("*")
    .match({ user_id, post_id: postId });

  if (error) {
    console.error("좋아요 데이터 불러오기에 실패했습니다.");
    throw error;
  }

  return likesData || [];
};

type deleteLikeProps = {
  userId: Like["user_id"];
  postId: Like["post_id"];
};

// 좋아요 삭제
export const deleteLike = async ({ userId, postId }: deleteLikeProps) => {
  const { data: likesData, error } = await supabase
    .from("likes")
    .delete()
    .match({ user_id: userId, post_id: postId });

  if (error) {
    console.error("좋아요 삭제에 실패했습니다.");
    throw error;
  }
  return likesData;
};

type addLikeProps = {
  userId: Like["user_id"];
  postId: Like["post_id"];
};

// 좋아요 저장
export const addLike = async ({ userId, postId }: addLikeProps) => {
  const { data: likesData, error } = await supabase.from("likes").insert([
    {
      user_id: userId,
      post_id: postId,
    },
  ]);

  if (error) {
    console.error("좋아요 저장에 실패했습니다.");
    throw error;
  }
  return likesData;
};

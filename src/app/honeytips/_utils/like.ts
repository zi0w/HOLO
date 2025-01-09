"use client";

import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 좋아요 불러오기
export const fetchLikesData = async (postId: Like["post_id"]) => {
  const user_id = "9826a705-38ce-4a07-b0dc-cbfb251355e3";
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .match({ user_id, post_id: postId })

  if (error) {
    console.error("좋아요 데이터 불러오기 실패!");
    throw error;
  }

  return data;
};

type deleteLikeProps = {
  userId: Like["user_id"];
  postId: Like["post_id"];
};

// 좋아요 삭제
export const deleteLike = async ({ userId, postId }: deleteLikeProps) => {
  const { data, error } = await supabase
    .from("likes")
    .delete()
    .match({ user_id: userId, post_id: postId });

  if (error) {
    console.error("좋아요 삭제 실패!");
    throw error;
  }
  return data;
};

type addLikeProps = {
  userId: Like["user_id"];
  postId: Like["post_id"];
};

// 좋아요 저장
export const addLike = async ({ userId, postId }: addLikeProps) => {
  const { data, error } = await supabase.from("likes").insert([
    {
      user_id: userId,
      post_id: postId,
    },
  ]);

  if (error) {
    console.error("좋아요 저장 실패!");
    throw error;
  }
  return data;
};

// 좋아요 개수 세기
export const countLikes = async (id: Like['post_id']) => {
  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", id)

    if (error) {
      console.error("좋아요 개수 세기 실패!", error);
      throw error;
    }
    return count ?? 0;
};

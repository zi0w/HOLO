"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// user Id 가져오기
export const getId = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.error("유저 아이디 불러오기 실패!", error);
    return null;
  }
  return data.user.id;
};

// 코멘트 가져오기
export const fetchCommentData = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, users(nickname, profile_img)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("코멘트 불러오기 실패!");
    throw error;
  }
  return data;
};

// 코멘트 저장
export const addComment = async (newComment: Comment["comment"]) => {
  const user_id = await getId();
  const { data, error } = await supabase
    .from("comments")
    .insert([{ comment: newComment, user_id: user_id! }])
    .select();

  if (error) {
    console.error("코멘트 저장 실패!");
    throw error;
  }
  return data;
};

// 코멘트 업데이트
type updateCommentProps = {
  editingComment: Comment["comment"];
  editingId: Comment["id"];
};

export const updateComment = async ({
  editingComment,
  editingId,
}: updateCommentProps) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ comment: editingComment })
    .eq("id", editingId)
    .select();

  if (error) {
    console.error("코멘트 업데이트 실패!", error);
    throw error;
  }
  return data;
};

// 코멘트 삭제
export const deleteComment = async (id: Comment["id"]) => {
  const { data, error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error("코멘트 삭제 실패!", error);
    throw error;
  }
  return data;
};

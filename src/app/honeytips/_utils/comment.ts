"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 코멘트 가져오기
export const fetchCommentData = async (postId: Comment["post_id"]) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, users(nickname, profile_image_url)")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("코멘트 불러오기 실패!");
    throw error;
  }
  return data;
};

// 코멘트 저장
export const addComment = async (newComment: {
  comment: Comment["comment"];
  postId: Comment["post_id"];
}) => {
  // const user_id = await getId();
  const user_id = "9826a705-38ce-4a07-b0dc-cbfb251355e3"; // 예시 user_id
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        comment: newComment.comment,
        post_id: newComment.postId,
        user_id: user_id,
      },
    ])
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
  postId: Comment["post_id"];
};

export const updateComment = async ({
  editingComment,
  editingId,
  postId,
}: updateCommentProps) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ comment: editingComment })
    .eq("id", editingId)
    .eq("post_id", postId)
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

// 코멘트 개수 세기
export const countComments = async (id: Comment['post_id']) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", id)

    if (error) {
      console.error("코멘트 개수 세기 실패!", error);
      throw error;
    }
    return count ?? 0;
};

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 코멘트 데이터 불러오기
export const fetchCommentData = async (postId: Comment["post_id"]) => {
  try {
    const { data: commentData, error } = await supabase
      .from("comments")
      .select("*, users(nickname, profile_image_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return commentData;
  } catch (error) {
    console.error("코멘트 불러오기에 실패했습니다.", error);
    throw error;
  }
};

// 코멘트 저장
export const addComment = async (newComment: {
  comment: Comment["comment"];
  postId: Comment["post_id"];
}) => {
  try {
    const user_id = await getId();

    if (!user_id) {
      console.error("유저 아이디를 찾을 수 없습니다.");
      throw new Error("유저 아이디를 찾을 수 없습니다.");
    }

    const { data: commentData, error } = await supabase
      .from("comments")
      .insert([
        {
          comment: newComment.comment,
          post_id: newComment.postId,
          user_id: user_id,
        },
      ])
      .select();

    if (error) throw error;

    return commentData;
  } catch (error) {
    console.error("코멘트 저장에 실패했습니다.", error);
    throw error;
  }
};

// 코멘트 수정
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
  try {
    const { data: commentData, error } = await supabase
      .from("comments")
      .update({ comment: editingComment })
      .eq("id", editingId)
      .eq("post_id", postId)
      .select();

    if (error) throw error;

    return commentData;
  } catch (error) {
    console.error("코멘트 업데이트에 실패했습니다.", error);
    throw error;
  }
};

// 코멘트 삭제
export const deleteComment = async (id: Comment["id"]) => {
  try {
    const { data: commentData, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return commentData;
  } catch (error) {
    console.error("코멘트 삭제에 실패했습니다.", error);
    throw error;
  }
};

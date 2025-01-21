// api/comments.ts
import type { Comment } from "@/app/mypage/[id]/_components/_type/Comment";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchCommentData = async (userId: string): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      posts(
        id,
        title,
        content,
        created_at,
        categories
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((comment) => ({
    ...comment,
    content: comment.comment,
  }));
};

export const deleteComment = async (commentId: string): Promise<void> => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .match({ id: commentId });
  if (error) throw error;
};

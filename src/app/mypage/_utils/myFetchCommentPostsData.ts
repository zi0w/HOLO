import { createClient } from "@/lib/utils/supabase/client";

type User = {
  nickname: string;
  profile_image_url: string | null;
};

type Post = {
  title: string;
  users: User; // 게시글 작성자 정보
};

type CommentWithPost = {
  id: string;
  comment: string;
  created_at: string;
  users: User; // 댓글 작성자 정보
  posts: Post; // 게시물 정보
};

const supabase = createClient();

export const MyfetchCommentPostsData = async (userId: string): Promise<CommentWithPost[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      users(nickname, profile_image_url),
      posts(
      post_image_url,
        title,
        users(nickname, profile_image_url)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("댓글이 달린 게시물 불러오기 실패:", error);
    throw error;
  }

  return data || [];
};







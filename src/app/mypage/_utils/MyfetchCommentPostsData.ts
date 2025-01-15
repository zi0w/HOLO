import { createClient } from "@/lib/utils/supabase/client";

type User = {
  nickname: string;
  profile_image_url: string | null;
};

type Post = {
  title: string;
};

type CommentWithPost = {
  id: string;
  comment: string;
  created_at: string;
  users: User; // 댓글 작성자 정보
  posts: Post; // 게시물 정보
  post_title?: string; // 선택적 게시물 제목
};

const supabase = createClient();

// Fetch all posts that the current user has commented on, including post titles
export const MyfetchCommentPostsData = async (userId: string): Promise<CommentWithPost[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      users(nickname, profile_image_url),
      posts(title)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("댓글이 달린 게시물 불러오기 실패:", error);
    throw error;
  }

  return data.map(comment => ({
    ...comment,
    post_title: comment.posts.title // 게시물 제목 추가
  })) || [];
};













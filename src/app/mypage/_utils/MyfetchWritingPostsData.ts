import { Post } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

export const MyfetchWritingPostsData = async (
  userId: string,
): Promise<Post[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      likes:likes(user_id),
      users:users(nickname, profile_image_url),
      post_image_url,
      comments:comments(id)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("작성한 게시물 불러오기 실패:", error);
    throw error;
  }

  // 데이터 구조 변환
  const formattedData =
    data?.map((post) => ({
      ...post,
      likes: [{ count: post.likes?.length || 0 }],
      comments: [{ count: post.comments?.length || 0 }],
    })) || [];

  return formattedData;
};

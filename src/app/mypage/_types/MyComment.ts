import type { Tables } from "@/lib/types/supabase";

export type User = {
  nickname: string;
  profile_image_url: string | null;
};

export type Post = {
  title: string;
};

export type Comment = Tables<"comments"> & {
  users: User; // 댓글 작성자 정보
  post_title?: string; // 선택적 게시물 제목
};










"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { fetchCommentData } from "@/app/honeytips/_utils/comment";
import { useQuery } from "@tanstack/react-query";

const useCommentData = (postId: Comment["post_id"]) => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", postId], // postId를 queryKey에 포함
    queryFn: () => fetchCommentData(postId), // postId를 전달
    enabled: !!postId, // postId가 있어야 쿼리 활성화
  });
};

export default useCommentData;

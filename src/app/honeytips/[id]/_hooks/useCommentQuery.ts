"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { fetchCommentData } from "@/app/honeytips/_utils/comment";
import { useQuery } from "@tanstack/react-query";

export const useCommentDataQuery = (postId: Comment["post_id"]) => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentData(postId),
    enabled: !!postId,
  });
};
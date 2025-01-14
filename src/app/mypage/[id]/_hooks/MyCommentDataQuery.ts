"use client";

import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { fetchCommentData } from "@/app/honeytips/_utils/comment";
import { useQuery } from "@tanstack/react-query";

export const myCommentDataQuery = (postId: Comment["post_id"], userId: string) => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", postId, userId],
    queryFn: () => fetchCommentData(postId),
    enabled: !!postId && !!userId,
  });
};

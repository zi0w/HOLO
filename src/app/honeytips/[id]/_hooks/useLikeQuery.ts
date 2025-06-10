"use client";

import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { fetchLikesData } from "@/app/honeytips/_utils/like";
import { useQuery } from "@tanstack/react-query";

export const useLikeDataQuery = (postId: Like["post_id"]) => {
  return useQuery<Like[], Error>({
    queryKey: ["likes", postId],
    queryFn: () => fetchLikesData(postId),
    enabled: !!postId,
  });
};

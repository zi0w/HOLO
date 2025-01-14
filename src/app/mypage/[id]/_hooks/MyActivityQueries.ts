"use client";

import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/app/honeytips/_types/honeytips.type";

export const myCommentedPostsQuery = (userId: string) => {
  return useQuery<Post[], Error>({
    queryKey: ["commentedPosts", userId],
    queryFn: () => fetchCommentedPosts(userId),
    enabled: !!userId,
  });
};

export const myLikedPostsQuery = (userId: string) => {
  return useQuery<Post[], Error>({
    queryKey: ["likedPosts", userId],
    queryFn: () => fetchLikedPosts(userId),
    enabled: !!userId,
  });
};

export const myPostsQuery = (userId: string) => {
  return useQuery<Post[], Error>({
    queryKey: ["myPosts", userId],
    queryFn: () => fetchMyPosts(userId),
    enabled: !!userId,
  });
};

// API functions (to be implemented on backend)
async function fetchCommentedPosts(userId: string): Promise<Post[]> {
  // API 호출로직
}

async function fetchLikedPosts(userId: string): Promise<Post[]> {
 //API 호출로직
}

async function fetchMyPosts(userId: string): Promise<Post[]> {
  // API 호출로직
}

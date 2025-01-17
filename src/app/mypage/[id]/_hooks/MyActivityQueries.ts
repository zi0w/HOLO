// "use client";

// import { useQuery } from "@tanstack/react-query";
// import type { Post } from "@/app/honeytips/_types/honeytips.type";

// // 내가 댓글을 단 게시글을 가져오는 쿼리
// export const myCommentedPostsQuery = (userId: string) => {
//   return useQuery<Post[], Error>({
//     queryKey: ["commentedPosts", userId],
//     queryFn: () => fetchCommentedPosts(userId),
//     enabled: !!userId, // userId가 있을 때만 쿼리를 실행
//   });
// };

// // 내가 좋아요를 누른 게시글을 가져오는 쿼리
// export const myLikedPostsQuery = (userId: string) => {
//   return useQuery<Post[], Error>({
//     queryKey: ["likedPosts", userId],
//     queryFn: () => fetchLikedPosts(userId),
//     enabled: !!userId, // userId가 있을 때만 쿼리를 실행
//   });
// };

// // 내가 작성한 게시글을 가져오는 쿼리
// export const myPostsQuery = (userId: string) => {
//   return useQuery<Post[], Error>({
//     queryKey: ["myPosts", userId],
//     queryFn: () => fetchMyPosts(userId),
//     enabled: !!userId, // userId가 있을 때만 쿼리를 실행
//   });
// };

// // API 호출 함수 (백엔드에서 구현해야 함)
// async function fetchCommentedPosts(userId: string): Promise<Post[]> {
//   // API 호출 로직을 여기에 구현
//   return [] as Post[]; // 임시로 빈 배열 반환 (나중에 실제 데이터로 대체해야 함)
// }

// async function fetchLikedPosts(userId: string): Promise<Post[]> {
//   // API 호출 로직을 여기에 구현
//   return [] as Post[]; // 임시로 빈 배열 반환 (나중에 실제 데이터로 대체해야 함)
// }

// async function fetchMyPosts(userId: string): Promise<Post[]> {
//   // API 호출 로직을 여기에 구현
//   return [] as Post[]; // 임시로 빈 배열 반환 (나중에 실제 데이터로 대체해야 함)
// }

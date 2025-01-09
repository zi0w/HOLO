"use client";

import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { addLike, deleteLike } from "@/app/honeytips/_utils/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 좋아요 추가/삭제
export const useLikeMutation = (postId: Like["post_id"]) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    {
      action: "add" | "delete";
      userId: Like["user_id"];
      postId: Like["post_id"];
    },
    { previousLikes: Like[] | undefined }
  >({
    mutationFn: ({ action, userId, postId }) => {
      if (action === "add") {
        return addLike({ userId, postId });
      } else if (action === "delete") {
        return deleteLike({ userId, postId });
      }
      throw new Error("잘못된 action 값입니다.");
    },
    onMutate: async ({ action, userId, postId }) => {
      // 현재 좋아요 데이터 가져오기
      await queryClient.cancelQueries({ queryKey: ["likes", postId] });
      const previousLikes = queryClient.getQueryData<Like[]>(["likes", postId]);

      // 낙관적 업데이트
      queryClient.setQueryData<Like[]>(["likes", postId], (prev) => {
        if (!prev) return [];
        if (action === "add") {
          return [...prev, { user_id: userId, post_id: postId }];
        } else if (action === "delete") {
          return prev.filter((like) => like.user_id !== userId);
        }
        return prev;
      });
      return { previousLikes };
    },
    onError: (_, __, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(["likes", postId], context.previousLikes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
  });
};

// // 좋아요 추가
// export const useAddLikeMutation = (postId: Like["post_id"]) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     unknown,
//     Error,
//     { userId: Like["user_id"]; postId: Like["post_id"] }
//   >({
//     mutationFn: ({ userId, postId }) => addLike({ userId, postId }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["likes", postId] });
//     },
//     onError: (error) => {
//       console.error("좋아요 추가 중 오류 발생:", error.message);
//     },
//   });
// };

// // 좋아요 삭제
// export const useDeleteLikeMutation = (postId: Like["post_id"]) => {
//   const queryClient = useQueryClient();
//   return useMutation<
//     unknown,
//     Error,
//     { userId: Like["user_id"]; postId: Like["post_id"] }
//   >({
//     mutationFn: ({ userId, postId }) => deleteLike({ userId, postId }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["likes", postId] });
//     },
//     onError: (error) => {
//       console.error("좋아요 삭제 중 오류 발생:", error.message);
//     },
//   });
// };

// // 좋아요 추가/삭제
// export const useLikeMutation = (postId: Like["post_id"]) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     unknown,
//     Error,
//     { action: "add" | "delete"; userId: Like["user_id"]; postId: Like["post_id"] }
//   >({
//     mutationFn: ({ action, userId, postId }) => {
//       if (action === "add") {
//         return addLike({ userId, postId });
//       } else if (action === "delete") {
//         return deleteLike({ userId, postId });
//       }
//       throw new Error("잘못된 action 값입니다.");
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["likes", postId] });
//     },
//     onError: (error) => {
//       console.error("좋아요 처리 중 오류 발생:", error.message);
//     },
//   });
// };

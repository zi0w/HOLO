"use client";

import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { addLike, deleteLike } from "@/app/honeytips/_utils/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

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
          const tempId = uuidv4(); // 임시 ID, created_at 생성
          const now = new Date().toISOString();
          return [...prev, {user_id: userId, post_id: postId, created_at: now, id: tempId}];
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
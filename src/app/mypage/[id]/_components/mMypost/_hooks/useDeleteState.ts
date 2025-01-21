// hooks/useDeleteState.ts
import { useState } from "react";

export const useDeleteState = () => {
  const [deletingPosts, setDeletingPosts] = useState<Set<string>>(new Set());

  const addDeletingPost = (postId: string) => {
    setDeletingPosts((prev) => {
      const next = new Set(prev);
      next.add(postId);
      return next;
    });
  };

  const removeDeletingPost = (postId: string) => {
    setDeletingPosts((prev) => {
      const next = new Set(prev);
      next.delete(postId);
      return next;
    });
  };

  const isDeleting = (postId: string) => deletingPosts.has(postId);

  return {
    isDeleting,
    addDeletingPost,
    removeDeletingPost,
  };
};
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CommentModalState = {
  isCommentModalOpen: boolean;
  isCommentConfirm: boolean;
  setIsCommentModalOpen: (isCommentModalOpen: boolean) => void;
  setIsCommentConfirm: (isCommentConfirm: boolean) => void;
};

const useCommentModalStore = create<CommentModalState>()(
  persist(
    (set) => ({
      isCommentModalOpen: false,
      isCommentConfirm: false,
      setIsCommentModalOpen: (isCommentModalOpen) => set({ isCommentModalOpen }),
      setIsCommentConfirm: (isCommentConfirm) => set({ isCommentConfirm }),
    }),
    {
      name: "comment-modal-storage",
    },
  ),
);

export default useCommentModalStore;

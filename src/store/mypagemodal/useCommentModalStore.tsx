// src/store/modal/commentModalStore.ts
import { create } from "zustand";

type CommentModalState = {
  isCommentModalOpen: boolean;
  openCommentModal: () => void;
  closeCommentModal: () => void;
};

const useCommentModalStore = create<CommentModalState>((set) => ({
  isCommentModalOpen: false,
  openCommentModal: () => set({ isCommentModalOpen: true }),
  closeCommentModal: () => set({ isCommentModalOpen: false }),
}));

export default useCommentModalStore;



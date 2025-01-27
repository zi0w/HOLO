import { create } from "zustand";

type LikeModalState = {
  isLikeModalOpen: boolean;
  openLikeModal: () => void;
  closeLikeModal: () => void;
};

const useLikeModalStore = create<LikeModalState>((set) => ({
  isLikeModalOpen: false,
  openLikeModal: () => set({ isLikeModalOpen: true }),
  closeLikeModal: () => set({ isLikeModalOpen: false }),
}));

export default useLikeModalStore;

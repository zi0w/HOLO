
import { create } from "zustand";

type PostModalState = {
  isPostModalOpen: boolean;
  openPostModal: () => void;
  closePostModal: () => void;
};

const usePostModalStore = create<PostModalState>((set) => ({
  isPostModalOpen: false,
  openPostModal: () => set({ isPostModalOpen: true }),
  closePostModal: () => set({ isPostModalOpen: false }),
}));

export default usePostModalStore;




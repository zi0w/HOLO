// src/store/modal/postModalStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PostModalState = {
  isPostModalOpen: boolean;
  isPostConfirm: boolean;
  setIsPostModalOpen: (isPostModalOpen: boolean) => void;
  setIsPostConfirm: (isPostConfirm: boolean) => void;
};

const usePostModalStore = create<PostModalState>()(
  persist(
    (set) => ({
      isPostModalOpen: false,
      isPostConfirm: false,
      setIsPostModalOpen: (isPostModalOpen) => set({ isPostModalOpen }),
      setIsPostConfirm: (isPostConfirm) => set({ isPostConfirm }),
    }),
    {
      name: "usepost-modal-storage",
    },
  ),
);

export default usePostModalStore;
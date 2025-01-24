import { create } from "zustand";
import { persist } from "zustand/middleware";

type DetailModalState = {
  isDetailModalOpen: boolean;
  isDetailConfirm: boolean;
  setIsDetailModalOpen: (isDetailModalOpen: boolean) => void;
  setIsDetailConfirm: (isDetailConfirm: boolean) => void;
};

const useDetailModalStore = create<DetailModalState>()(
  persist(
    (set) => ({
      isDetailModalOpen: false,
      isDetailConfirm: false,
      setIsDetailModalOpen: (isDetailModalOpen) => set({ isDetailModalOpen }),
      setIsDetailConfirm: (isDetailConfirm) => set({ isDetailConfirm }),
    }),
    {
      name: "detail-modal-storage",
    },
  ),
);

export default useDetailModalStore;

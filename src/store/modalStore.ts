import { create } from "zustand";
import { persist } from "zustand/middleware";

type ModalState = {
  isModalOpen: boolean;
  isConfirm: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsConfirm: (isConfirm: boolean) => void;
};

const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      isConfirm: false,
      setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
      setIsConfirm: (isConfirm) => set({ isConfirm }),
    }),
    {
      name: "modal-storage",
    },
  ),
);

export default useModalStore;

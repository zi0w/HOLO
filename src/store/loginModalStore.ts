import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginModalState = {
  isLoginModalOpen: boolean;
  isLoginConfirm: boolean;
  setIsLoginModalOpen: (isModalOpen: boolean) => void;
  setIsLoginConfirm: (isConfirm: boolean) => void;
};

const useLoginModalStore = create<LoginModalState>()(
  persist(
    (set) => ({
      isLoginModalOpen: false,
      isLoginConfirm: false,
      setIsLoginModalOpen: (isLoginModalOpen) => set({ isLoginModalOpen }),
      setIsLoginConfirm: (isLoginConfirm) => set({ isLoginConfirm }),
    }),
    {
      name: "login-modal-storage",
    },
  ),
);

export default useLoginModalStore;

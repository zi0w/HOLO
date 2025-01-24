import { create } from "zustand";
import { persist } from "zustand/middleware";

type FormModalState = {
  isFormModalOpen: boolean;
  isFormConfirm: boolean;
  setIsFormModalOpen: (isFormModalOpen: boolean) => void;
  setIsFormConfirm: (isFormConfirm: boolean) => void;
};

const useFormModalStore = create<FormModalState>()(
  persist(
    (set) => ({
      isFormModalOpen: false,
      isFormConfirm: false,
      setIsFormModalOpen: (isFormModalOpen) =>
        set({ isFormModalOpen: isFormModalOpen }),
      setIsFormConfirm: (isFormConfirm) => set({ isFormConfirm }),
    }),
    {
      name: "form-modal-storage",
    },
  ),
);

export default useFormModalStore;

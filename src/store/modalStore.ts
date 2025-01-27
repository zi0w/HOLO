import { create } from "zustand";

type ModalStore = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useCommentModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

// export const useDetailModalStore = create<ModalStore>((set) => ({
//   isModalOpen: false,
//   openModal: () => set({ isModalOpen: true }),
//   closeModal: () => set({ isModalOpen: false }),
// }));

// export const useFormModalStore = create<ModalStore>((set) => ({
//   isModalOpen: false,
//   openModal: () => set({ isModalOpen: true }),
//   closeModal: () => set({ isModalOpen: false }),
// }));

// export const useLikeModalStore = create<ModalStore>((set) => ({
//   isModalOpen: false,
//   openModal: () => set({ isModalOpen: true }),
//   closeModal: () => set({ isModalOpen: false }),
// }));

// export const usePostModalStore = create<ModalStore>((set) => ({
//   isModalOpen: false,
//   openModal: () => set({ isModalOpen: true }),
//   closeModal: () => set({ isModalOpen: false }),
// }));

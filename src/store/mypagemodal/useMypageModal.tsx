import { create } from "zustand";

export type ModalType = 'comment' | 'like' | 'post';

type ModalState = {
  isOpen: boolean;
  selectedId: string | null;
  modalType: ModalType | null;
  openModal: (id: string, type: ModalType) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedId: null,
  modalType: null,
  openModal: (id, type) => set({ isOpen: true, selectedId: id, modalType: type }),
  closeModal: () => set({ isOpen: false, selectedId: null, modalType: null }),
}));

export default useModalStore;
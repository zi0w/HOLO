import { create } from "zustand";

type ModalStore = {
  isModalOpen: boolean;
  modalCommentId: string | null;
  modalType: 'default' | 'detail' | 'form' | 'like' | 'post';
  openModal: (type: ModalStore['modalType'], id?: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  modalCommentId: null,
  modalType: 'default',
  openModal: (type: ModalStore['modalType'], id?: string) => 
    set({ isModalOpen: true, modalType: type, modalCommentId: id || null }),
  closeModal: () => set({ isModalOpen: false, modalType: 'default', modalCommentId: null }),
}));

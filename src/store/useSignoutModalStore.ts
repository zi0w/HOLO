import { create } from "zustand";

export type LogoutModalType = 'header-logout' | 'mypage-logout';

type SignoutModalState = {
  isOpen: boolean;
  selectedId: string | null;
  modalType: LogoutModalType | null;
  isSuccess: boolean;
  errorMessage: string | null;
  openModal: (id: string, type: LogoutModalType) => void;
  closeModal: () => void;
  setSuccess: (value: boolean) => void;
  setError: (message: string | null) => void;
};

export const useSignoutModalStore = create<SignoutModalState>((set) => ({
  isOpen: false,
  selectedId: null,
  modalType: null,
  isSuccess: false,
  errorMessage: null,
  openModal: (id, type) => set({ 
    isOpen: true, 
    selectedId: id, 
    modalType: type,
    isSuccess: false,
    errorMessage: null 
  }),
  closeModal: () => set({ 
    isOpen: false, 
    selectedId: null, 
    modalType: null,
    isSuccess: false,
    errorMessage: null 
  }),
  setSuccess: (value) => set({ isSuccess: value }),
  setError: (message) => set({ errorMessage: message }),
}));






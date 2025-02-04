import { create } from "zustand";
export type LocationModalType = "permission" | "error" | "guide";
type LocationModalState = {
  isOpen: boolean;
  selectedId: string | null;
  modalType: LocationModalType | null;
  openModal: (id: string, type: LocationModalType) => void;
  closeModal: () => void;
};
export const useLocationModalStore = create<LocationModalState>((set) => ({
  isOpen: false,
  selectedId: null,
  modalType: null,
  openModal: (id, type) =>
    set({ isOpen: true, selectedId: id, modalType: type }),
  closeModal: () => set({ isOpen: false, selectedId: null, modalType: null }),
}));

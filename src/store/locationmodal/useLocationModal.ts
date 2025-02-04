import { create } from "zustand";
export type LocationModalType = "permission" | "error" | "guide";
type LocationModalState = {
  isOpen: boolean;
  selectedId: string | null;
  modalType: LocationModalType | null;
  onActionCallback: (() => void) | null;
  openModal: (
    id: string,
    type: LocationModalType,
    options?:{onAction?:()=>void}
  ) => void;
  closeModal: () => void;
};
export const useLocationModalStore = create<LocationModalState>((set) => ({
  isOpen: false,
  selectedId: null,
  modalType: null,
  onActionCallback: null,
  openModal: (id, type, options) =>
    set({
      isOpen: true,
      selectedId: id,
      modalType: type,
      onActionCallback: options?.onAction || null,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      selectedId: null,
      modalType: null,
      onActionCallback: null,
    }),
}));

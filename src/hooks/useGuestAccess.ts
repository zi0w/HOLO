// hooks/useGuestAccess.ts
import { create } from "zustand";

export type GuestState = {
  isGuest: boolean;
  setGuest: (value: boolean) => void;
}

export const useGuestStore = create<GuestState>()((set) => ({
  isGuest: false,
  setGuest: (value: boolean) => set({ isGuest: value }),
}));


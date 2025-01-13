// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  nickname: string;
  profile_image_url: string | any;   // 추후에 any 타입 알맞는타입 지정하기
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: any | null;
  setAuth: (user: User | null, session: any | null) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      session: null,
      setAuth: (user, session) =>
        set(() => ({
          isLoggedIn: !!user,
          user,
          session,
        })),
      clearAuth: () =>
        set(() => ({
          isLoggedIn: false,
          user: null,
          session: null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;

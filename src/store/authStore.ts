
import { Session } from "@supabase/supabase-js"; 
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  nickname: string;
  profile_image_url: string | null; 
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null; 
  setAuth: (user: User | null, session: Session | null) => void; 
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
      clearAuth: () => {
        set(() => ({
          isLoggedIn: false,
          user: null,
          session: null,
        }));
        localStorage.removeItem("auth-storage"); // 로컬스토리지에서 auth-storage 삭제
      },
    }),
    {
      name: "auth-storage", // 로컬스토리지에 저장될 키 이름
    },
  ),
);

export default useAuthStore;


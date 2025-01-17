// store/useAuthStore.ts
import { Session } from "@supabase/supabase-js"; // Supabase 세션 타입 가져오기
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  nickname: string;
  profile_image_url: string | null; // null 또는 string으로 변경
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null; // Supabase 세션 타입으로 변경
  setAuth: (user: User | null, session: Session | null) => void; // 세션 타입 변경
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

// // store/useAuthStore.ts
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type User = {
//   id: string;
//   email: string;
//   nickname: string;
//   profile_image_url: string | any;   // 추후에 any 타입 알맞는타입 지정하기
// };

// export type AuthState = {
//   isLoggedIn: boolean;
//   user: User | null;
//   session: any | null;
//   setAuth: (user: User | null, session: any | null) => void;
//   clearAuth: () => void;
// };

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       isLoggedIn: false,
//       user: null,
//       session: null,
//       setAuth: (user, session) =>
//         set(() => ({
//           isLoggedIn: !!user,
//           user,
//           session,
//         })),
//       clearAuth: () =>
//         set(() => ({
//           isLoggedIn: false,
//           user: null,
//           session: null,
//         })),
//     }),
//     {
//       name: "auth-storage",
//     },
//   ),
// );

// export default useAuthStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

// User 타입 정의
export type User = {
  id: string;
  email: string;
  nickname: string;
  profile_image_url: string | null; // 프로필 이미지 URL은 문자열 또는 null일 수 있음
};

// Session 타입 정의 (예시)
export type Session = {
  access_token: string;
  refresh_token: string;
  user: User; // 사용자 정보
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null; // session을 Session 타입으로 변경
  setAuth: (user: User | null, session: Session | null) => void; // session도 Session 타입으로 변경
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







// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // User 타입 정의
// export type User = {
//   id: string;
//   email: string;
//   nickname: string;
//   profile_image_url: string | null; // 프로필 이미지 URL은 문자열 또는 null일 수 있음
// };

// export type AuthState = {
//   isLoggedIn: boolean;
//   user: User | null;
//   session: any | null; // session은 필요에 따라 적절한 타입으로 변경 가능
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
//       clearAuth: () => {
//         set(() => ({
//           isLoggedIn: false,
//           user: null,
//           session: null,
//         }));
//         localStorage.removeItem("auth-storage"); // 로컬스토리지에서 auth-storage 삭제
//       },
//     }),
//     {
//       name: "auth-storage", // 로컬스토리지에 저장될 키 이름
//     },
//   ),
// );

// export default useAuthStore;







// // // store/useAuthStore.ts
// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // export type User = {
// //   id: string;
// //   email: string;
// //   nickname: string;
// //   profile_image_url: string | any;   // 추후에 any 타입 알맞는타입 지정하기
// // };

// // export type AuthState = {
// //   isLoggedIn: boolean;
// //   user: User | null;
// //   session: any | null;
// //   setAuth: (user: User | null, session: any | null) => void;
// //   clearAuth: () => void;
// // };

// // const useAuthStore = create<AuthState>()(
// //   persist(
// //     (set) => ({
// //       isLoggedIn: false,
// //       user: null,
// //       session: null,
// //       setAuth: (user, session) =>
// //         set(() => ({
// //           isLoggedIn: !!user,
// //           user,
// //           session,
// //         })),
// //       clearAuth: () =>
// //         set(() => ({
// //           isLoggedIn: false,
// //           user: null,
// //           session: null,
// //         })),
// //     }),
// //     {
// //       name: "auth-storage",
// //     },
// //   ),
// // );

// // export default useAuthStore;

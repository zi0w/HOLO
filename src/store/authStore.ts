"use client";
import { Session } from "@/app/sign-up/_types/authStateType";
import { User } from "@/app/sign-up/_types/userType";
import { createClient } from "@/lib/utils/supabase/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_PROFILE_IMAGE =
  "https://qxytgvrleqpskxcfuvja.supabase.co/storage/v1/object/public/profile_images/default_profile_img.webp";

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null; // 세션 정보 추가
  setAuth: (user: User | null, session: Session | null) => void; // 사용자와 세션 설정
  clearAuth: () => void; // 인증 정보 초기화
  fetchAndSetAuth: () => Promise<void>; // Supabase에서 유저 정보 가져오기
  updateProfile: (nickname: string, profile_img: string) => void; // 프로필 업데이트
};

const supabase = createClient();

const AuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      session: null, // 초기값 설정

      // 상태에 유저 정보와 세션 설정
      setAuth: (user, session) =>
        set(() => ({
          isLoggedIn: !!user,
          user,
          session, // 세션 정보도 설정
        })),

      // 상태 초기화
      clearAuth: () =>
        set(() => ({
          isLoggedIn: false,
          user: null,
          session: null, // 세션 정보도 초기화
        })),

      // Supabase에서 유저 정보 가져오기
      fetchAndSetAuth: async () => {
        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();

          if (sessionError) {
            console.error("세션 정보 가져오기 실패:", sessionError);
            return;
          }

          const { data, error } = await supabase.auth.getUser();

          if (error) {
            console.error("유저 정보 가져오기 실패:", error);
            return;
          }

          const supabaseUser = data?.user;

          if (!supabaseUser) {
            console.warn("로그인된 유저가 없습니다.");
            return;
          }

          const { data: userDetails, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", supabaseUser.id)
            .single();

          if (userError) {
            console.error("유저 상세 정보 가져오기 실패:", userError);
            return;
          }

          // Zustand 상태 업데이트
          set({
            isLoggedIn: true,
            user: {
              id: supabaseUser.id,
              email: supabaseUser.email || "", // 이메일 추가
              nickname: userDetails.nickname || "Guest",
              profile_image_url:
                userDetails.profile_image_url || DEFAULT_PROFILE_IMAGE,
              created_at: userDetails.created_at || "",
            },
            session: {
              accessToken: session?.access_token || "",
              refreshToken: session?.refresh_token || "",
            },
          });
        } catch (fetchError) {
          console.error("fetchAndSetAuth -> 실패:", fetchError);
        }
      },

      // 프로필 업데이트
      updateProfile: (nickname, profile_img) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                nickname,
                profile_img_url: profile_img, // profile_img_url로 변경
              }
            : null,
        })),
    }),
    {
      name: "auth-storage", // 로컬 스토리지 키
    },
  ),
);

export default AuthStore;

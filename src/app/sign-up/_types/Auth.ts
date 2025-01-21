
import { User } from "@/app/sign-up/_types/UserType";

export type Session = {
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  setAuth: (user: User | null, session: Session | null) => void;
  clearAuth: () => void;
};
// '@/types/supabase' 경로에서 User 타입을 가져옵니다.
// User는 사용자 정보를 나타내는 타입으로, Supabase와 관련된 사용자 데이터 구조를 정의합니다.

import { User } from "./userType";

// Session 인터페이스는 사용자 세션 정보를 정의합니다.
export type Session = {
  // accessToken은 사용자가 인증된 후 서버와의 통신에 사용되는 토큰입니다.
  accessToken: string;
  // refreshToken은 accessToken이 만료되었을 때 새로운 accessToken을 얻기 위해 사용되는 토큰입니다.
  refreshToken: string;
};

// AuthState 인터페이스는 인증 상태를 나타내는 구조체입니다.
export type AuthState = {
  // isLoggedIn은 사용자가 현재 로그인 상태인지 여부를 나타내는 불리언 값입니다.
  isLoggedIn: boolean;
  // user는 현재 로그인한 사용자의 정보를 담고 있는 User 객체입니다.
  // 사용자가 로그인하지 않은 경우 null이 될 수 있습니다.
  user: User | null;
  // session은 현재 사용자의 세션 정보를 담고 있는 Session 객체입니다.
  // 사용자가 로그인하지 않은 경우 null이 될 수 있습니다.
  session: Session | null;
  // setAuth는 사용자와 세션 정보를 설정하는 메서드입니다.
  // user와 session 매개변수를 받아서 상태를 업데이트합니다.
  setAuth: (user: User | null, session: Session | null) => void;
  // clearAuth는 인증 정보를 초기화하는 메서드입니다.
  // 이 메서드를 호출하면 사용자의 로그인 상태와 세션 정보가 모두 지워집니다.
  clearAuth: () => void;
};
// 이 코드는 사용자 인증 상태를 관리하기 위한 인터페이스를 정의하고 있습니다.
// Session 인터페이스는 인증에 필요한 토큰 정보를 포함하고, AuthState 인터페이스는 로그인 상태,
//  사용자 정보, 세션 정보 및 인증 상태를 설정하고 초기화하는 메서드를 포함합니다.

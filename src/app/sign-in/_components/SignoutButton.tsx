"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout"; // 로그아웃 훅 임포트

const SignoutButton = () => {
  const { handleLogout } = useSignout(); // 로그아웃 핸들러 가져오기

  return (
    <button
      onClick={handleLogout} // 클릭 시 로그아웃 함수 호출
      className="w-full rounded-[10px] border-2 border-orange-600 bg-white text-orange-600 hover:bg-gray-100 px-4 py-2" // 스타일 적용
    >
      로그아웃
    </button>
  );
};

export default SignoutButton;

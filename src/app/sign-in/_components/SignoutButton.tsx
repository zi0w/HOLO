"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout";

const SignoutButton = () => {
  const { handleLogout } = useSignout();

  return (
    <button
      onClick={handleLogout}
      className="font-pretendard flex h-[48px] w-full items-center justify-center rounded-[4px] border border-[#FF7600] text-base text-[#FF7600] hover:bg-gray-50"
    >
      로그아웃
    </button>
  );
};

export default SignoutButton;

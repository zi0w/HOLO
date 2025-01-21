"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout";



const SignoutButton = () => {
  const { handleLogout } = useSignout();

  return (
    <button
      onClick={handleLogout}
      className="w-full h-[48px] rounded-[4px] border border-[#FF7600] text-[#FF7600] font-pretendard text-base hover:bg-gray-50 flex items-center justify-center"
    >
      로그아웃
    </button>
  );
};

export default SignoutButton;

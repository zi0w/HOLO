// SignoutButton.tsx
"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout";

const SignoutButton = () => {
  const { handleLogout } = useSignout();

  return (
    <button
      onClick={handleLogout}
      className="absolute left-[20px] top-[906px] h-[48px] w-[362px] rounded-tl-[4px] border-t border-[#E0E0E0] px-4 py-[14px] text-orange-600 hover:bg-gray-100"
    >
      로그아웃
    </button>
  );
};

export default SignoutButton;



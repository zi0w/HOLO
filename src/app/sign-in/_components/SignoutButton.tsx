"use client";

import { useSignout } from "@/app/sign-in/_hooks/useSignout";

const SignoutButton = () => {
  const { handleLogout } = useSignout();

  return (
    <button
      onClick={handleLogout}
      className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-600"
    >
      로그아웃
    </button>
  );
};

export default SignoutButton;

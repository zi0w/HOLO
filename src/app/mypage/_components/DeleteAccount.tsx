// components/DeleteAccount.tsx
"use client";

import { useDeleteAccount } from "@/app/mypage/_hooks/useDeleteAccount";



const DeleteAccount: React.FC = () => {
  const { handleDeleteAccount } = useDeleteAccount();

  return (
    <button
      onClick={handleDeleteAccount}
      className="absolute left-[20px] top-[906px] h-[48px] w-[362px] rounded-tl-[4px] border-t border-[#E0E0E0] px-4 py-[14px] text-black hover:bg-gray-100"
    >
      회원 탈퇴
    </button>
  );
};

export default DeleteAccount;
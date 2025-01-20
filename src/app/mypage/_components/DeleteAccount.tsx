"use client";

import { useDeleteAccount } from "@/app/mypage/_hooks/useDeleteAccount";

const DeleteAccount: React.FC = () => {
  const { handleDeleteAccount } = useDeleteAccount();

  // DeleteAccount.tsx의 return 부분
// DeleteAccount.tsx의 return 부분
// DeleteAccount.tsx의 return 부분
return (
  <button
    onClick={handleDeleteAccount}
    className="w-full h-[48px] mt-[16px] mb-[56px] rounded-[4px] border border-[#E0E0E0] text-[#8F8F8F] font-pretendard text-base hover:bg-gray-50 flex items-center justify-center"
  >
    회원탈퇴
  </button>
);
};

export default DeleteAccount;
"use client";

import { useDeleteAccount } from "@/app/mypage/_hooks/useDeleteAccount";
import Modal from "@/components/common/Modal";
import useModalStore from "@/store/modalStore";


const DeleteAccount = () => {
  const { handleDeleteAccount } = useDeleteAccount();
  const { setIsModalOpen, setIsConfirm } = useModalStore();

  const handleDelete = async () => {
    try {
      await handleDeleteAccount();
      setIsConfirm(false);
      setIsModalOpen(true); // "회원탈퇴되었습니다" 모달 표시
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsConfirm(true);
          setIsModalOpen(true);
        }}
        className="font-pretendard mb-[56px] flex h-[48px] w-full items-center justify-center rounded-[4px] border border-[#E0E0E0] text-base text-[#8F8F8F] hover:bg-gray-50"
      >
        회원탈퇴
      </button>

      <Modal
        text="회원탈퇴"
        onAction={handleDelete}
        onClose={() => {
          setIsModalOpen(false);
          setIsConfirm(false);
        }}
      />
    </>
  );
};

export default DeleteAccount;

"use client";

import { useDeleteAccount } from "@/app/mypage/_hooks/useDeleteAccount";
import DeleteModal from "@/app/mypage/_components/DeleteModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeleteAccount = () => {
  const router = useRouter();
  const { handleDeleteAccount } = useDeleteAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
    setIsConfirm(false);

    return () => {
      setIsModalOpen(false);
      setIsConfirm(false);
    };
  }, []);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
    setIsConfirm(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirm(true);  // 첫 번째 모달에서 취소 시 초기 상태로
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteAccount();
      setIsConfirm(false);  // 완료 모달로 전환
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setIsModalOpen(false);
      setIsConfirm(true);
    }
  };

  const handleCompleteClose = () => {
    router.push("/login");  // 완료 모달에서 확인 클릭 시 로그인 페이지로 이동
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="font-pretendard mb-[56px] flex h-[48px] w-full items-center justify-center rounded-[4px] border border-[#E0E0E0] text-base text-[#8F8F8F] hover:bg-gray-50"
      >
        회원탈퇴
      </button>

      <DeleteModal
        isOpen={isModalOpen}
        isConfirm={isConfirm}
        onAction={isConfirm ? handleConfirmDelete : handleCompleteClose}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default DeleteAccount;


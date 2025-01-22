"use client";

import { useDeleteAccount } from "@/app/mypage/_hooks/useDeleteAccount";
import Modal from "@/components/common/Modal";
import useModalStore from "@/store/modalStore";
import { useEffect } from 'react'; // useEffect 추가

const DeleteAccount = () => {
  const { handleDeleteAccount } = useDeleteAccount();
  const { setIsModalOpen, setIsConfirm, isModalOpen } = useModalStore();

  // 컴포넌트 마운트 시 모달 상태 초기화
  useEffect(() => {
    return () => {
      setIsModalOpen(false);
      setIsConfirm(false);
    };
  }, [setIsModalOpen, setIsConfirm]);

  const handleDelete = async () => {
    try {
      await handleDeleteAccount();
      setIsConfirm(false);
      setIsModalOpen(false); // 회원탈퇴 성공 시 모달 닫기
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setIsConfirm(false);
      setIsModalOpen(false);
    }
  };

  // 회원탈퇴 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    setIsConfirm(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="font-pretendard mb-[56px] flex h-[48px] w-full items-center justify-center rounded-[4px] border border-[#E0E0E0] text-base text-[#8F8F8F] hover:bg-gray-50"
      >
        회원탈퇴
      </button>

      {isModalOpen && (
        <Modal
          text="회원탈퇴"
          onAction={handleDelete}
          onClose={() => {
            setIsModalOpen(false);
            setIsConfirm(false);
          }}
        />
      )}
    </>
  );
};

export default DeleteAccount;





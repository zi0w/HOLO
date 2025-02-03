"use client";

import CloseIcon from "@/assets/images/common/close-icon.svg";

type DeleteModalProps = {
  isOpen: boolean;
  isConfirm: boolean;
  onAction: () => void;
  onClose: () => void;
}

const DeleteModal = ({
  isOpen,
  isConfirm,
  onAction,
  onClose,
}: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-800 bg-opacity-30">
      <div className="w-4/5 max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="text-center">
            {isConfirm
              ? "회원탈퇴 하시겠습니까?"
              : "회원탈퇴가 완료되었습니다."}
          </p>
        </div>
        <div className="mt-12 flex">
          {isConfirm && (
            <button
              onClick={onClose}
              className="flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg"
            >
              취소
            </button>
          )}
          {isConfirm ? (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800"
              onClick={onAction}
              
            >
              회원탈퇴
            </button>
          ) : (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !text-base"
              onClick={onClose}
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;



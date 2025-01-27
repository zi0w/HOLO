"use client";

import CloseIcon from "@/assets/images/common/close-icon.svg";

interface RemoveModalProps {
  text: string;  
  isOpen: boolean;
  isConfirm: boolean;
  onAction: () => void;
  onClose: () => void;
}

const RemoveModal = ({
  text,  
  isOpen, 
  isConfirm, 
  onAction, 
  onClose,
}: RemoveModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-800 bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="text-center">
            {isConfirm
              ? `${text} 을 삭제하시겠습니까?`
              : `${text} 삭제가 완료되었습니다.`}
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
              삭제
            </button>
          ) : (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !text-base"
              onClick={onClose}
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;

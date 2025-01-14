import type { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

export type ProfileEditModalProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const CompleteModal = ({
  title,
  isOpen,
  onClose,
  children,
}: ProfileEditModalProps) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무 것도 렌더링하지 않음

  // 모달 외부 클릭 시 닫기
  // const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
  //   if (e.currentTarget === e.target) {
  //     onClose();
  //   }
  // };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      // onClick={handleOverlayClick}
    >
      <div className="w-[80%] max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-5">
          <div className="mb-5 flex items-center">
            <h2 className="common-title mx-auto !leading-[normal]">{title}</h2>
            <button onClick={onClose} className="text-2xl">
              <IoMdClose />
            </button>
          </div>
          <p className="text-center text-lg font-bold">{children}</p>
        </div>
        <div className="mt-5">
          <button
            className="common-btn type-a w-full !rounded-t-none !text-lg"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;

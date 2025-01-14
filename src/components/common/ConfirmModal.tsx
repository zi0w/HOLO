import { IoMdClose } from "react-icons/io";

export type ProfileEditModalProps = {
  children: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}: ProfileEditModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[80%] max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-5">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onClose} className="text-2xl">
              <IoMdClose />
            </button>
          </div>
          <p className="text-center text-lg font-bold">
            {children}하시겠습니까?
          </p>
        </div>
        <div className="mt-5 flex">
          <button
            onClick={onClose}
            className="common-btn type-b flex-1 !rounded-none !rounded-bl-lg !text-lg"
          >
            취소
          </button>
          <button
            className="common-btn type-a flex-1 !rounded-none !rounded-br-lg !text-lg"
            onClick={handleConfirm}
          >
            {children}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

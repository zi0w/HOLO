import useModalStore from "@/store/modalStore";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  text: string;
  isConfirm: boolean;
  onAction: () => void;
};

const Modal = ({ text, onAction }: Omit<ModalProps, "isConfirm">) => {
  const { isModalOpen, setModalOpen, isConfirm } = useModalStore();
  if (!isModalOpen) return null;

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[80%] max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-5">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={handleClose} className="text-2xl">
              <IoMdClose />
            </button>
          </div>
          <p className="text-center text-lg font-bold">
            {isConfirm ? `${text}하시겠습니까?` : `${text}되었습니다.`}
          </p>
        </div>
        <div className="mt-5 flex">
          {isConfirm && (
            <button
              onClick={handleClose}
              className="common-btn type-b flex-1 !rounded-none !rounded-bl-lg !text-lg"
            >
              취소
            </button>
          )}
          {isConfirm ? (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-lg"
              onClick={onAction}
            >
              {text}
            </button>
          ) : (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !text-lg"
              onClick={handleClose}
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

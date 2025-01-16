import CloseIcon from "@/assets/images/common/close-icon.svg";
import useModalStore from "@/store/modalStore";

type ModalProps = {
  text: string;
  onAction: () => void;
};

const Modal = ({ text, onAction }: ModalProps) => {
  const { isModalOpen, setModalOpen, isConfirm } = useModalStore();
  if (!isModalOpen) return null;

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="text-center">
            {isConfirm ? `${text}하시겠습니까?` : `${text}되었습니다.`}
          </p>
        </div>
        <div className="mt-12 flex">
          {isConfirm && (
            <button
              onClick={handleClose}
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
              {text}
            </button>
          ) : (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !text-base"
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

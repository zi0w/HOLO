import CloseIcon from "@/assets/images/common/close-icon.svg";
import useLoginModalStore from "@/store/loginModalStore";

type ModalProps = {
  text: string;
  onAction: () => void;
  onClose?: () => void;
};

const LoginModal = ({ text, onAction, onClose }: ModalProps) => {
  const { isLoginModalOpen, setIsLoginModalOpen, isLoginConfirm } = useLoginModalStore();
  if (!isLoginModalOpen) return null;

  const handleClose = () => {
    setIsLoginModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="text-center text-lg">
            {isLoginConfirm ? `${text}하시겠습니까?` : `${text}되었습니다.`}
          </p>
        </div>
        <div className="mt-12 flex">
          {isLoginConfirm && (
            <button
              onClick={handleClose}
              className="flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg"
            >
              취소
            </button>
          )}
          {isLoginConfirm ? (
            <button
              className="common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800"
              onClick={onAction}
            >
              확인
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

export default LoginModal;

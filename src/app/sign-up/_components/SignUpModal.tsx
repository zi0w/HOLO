import CloseIcon from "@/assets/images/common/close-icon.svg";

type SignUpModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

const SignUpModal = ({ isOpen, message, onClose }: SignUpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-800 bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-base-50 shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="text-center">{message}</p>
        </div>
        <div className="mt-12 flex">
          <button
            className="common-btn type-a flex-1 !rounded-t-none !text-base"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
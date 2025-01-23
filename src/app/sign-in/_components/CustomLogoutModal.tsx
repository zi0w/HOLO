import CloseIcon from "@/assets/images/common/close-icon.svg";

type CustomLogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isSuccess?: boolean;
  errorMessage?: string;
};

const CustomLogoutModal = ({ 
  isOpen, 
  onClose, 
  onLogout, 
  isSuccess, 
  errorMessage 
}: CustomLogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="text-center">
            {errorMessage 
              ? errorMessage 
              : isSuccess 
                ? "로그아웃되었습니다." 
                : "로그아웃 하시겠습니까?"}
          </p>
        </div>
        <div className="mt-12 flex">
          {!isSuccess && !errorMessage && (
            <button
              onClick={onClose}
              className="flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg"
            >
              취소
            </button>
          )}
          <button
            className="common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800"
            onClick={isSuccess || errorMessage ? onClose : onLogout}
          >
            {isSuccess || errorMessage ? "확인" : "로그아웃"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomLogoutModal;




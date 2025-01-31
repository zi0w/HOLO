import CloseIcon from "@/assets/images/common/close-icon.svg";
import { useSignoutModalStore, type LogoutModalType } from "@/store/signoutmodal/useSignoutModalStore";


type LogoutModalProps = {
  modalId: string;
  modalType: LogoutModalType;
  onLogout: () => Promise<void>;
};

const LogoutModal = ({ modalId, modalType, onLogout }: LogoutModalProps) => {
  const {
    isOpen,
    selectedId,
    modalType: currentModalType,
    isSuccess,
    errorMessage,
    closeModal,
    setSuccess,
    setError,
  } = useSignoutModalStore();

  if (!isOpen || selectedId !== modalId || currentModalType !== modalType)
    return null;

  const handleLogout = async () => {
    try {
      await onLogout();
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "로그아웃 중 오류가 발생했습니다.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-800 bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-base-50 shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={closeModal}>
              <CloseIcon />
            </button>
          </div>
          <p className="font-pretendard text-center text-base text-base-800">
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
              onClick={closeModal}
              className="font-pretendard flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg text-base-800"
            >
              취소
            </button>
          )}
          <button
            className="common-btn type-a font-pretendard flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800"
            onClick={isSuccess || errorMessage ? closeModal : handleLogout}
          >
            {isSuccess || errorMessage ? "확인" : "로그아웃"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;


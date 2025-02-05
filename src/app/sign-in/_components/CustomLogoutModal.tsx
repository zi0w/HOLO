import CloseIcon from "@/assets/images/common/close-icon.svg";
import {
  useSignoutModalStore,
  type LogoutModalType,
} from "@/store/useSignoutModalStore";
import clsx from "clsx";

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
      closeModal();
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
          <p className={clsx("text-center text-base text-base-800")}>
            {errorMessage ? errorMessage : "로그아웃 하시겠습니까?"}
          </p>
        </div>
        <div className="mt-12 flex">
          {!errorMessage && (
            <button
              onClick={closeModal}
              className="flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg text-base-800"
            >
              취소
            </button>
          )}
          <button
            className={clsx(
              "common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800",
            )}
            onClick={errorMessage ? closeModal : handleLogout}
          >
            {errorMessage ? "확인" : "로그아웃"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

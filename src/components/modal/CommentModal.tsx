import CloseIcon from "@/assets/images/common/close-icon.svg";
import useCommentModalStore from "@/store/modal/commentModalStore";

type ModalProps = {
  text: string;
  onAction: () => void;
  onClose?: () => void;
};

const CommentModal = ({ text, onAction, onClose }: ModalProps) => {
  const { isCommentModalOpen, setIsCommentModalOpen, isCommentConfirm } =
    useCommentModalStore();
  if (!isCommentModalOpen) return null;

  const handleClose = () => {
    setIsCommentModalOpen(false);
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
            {isCommentConfirm ? `${text}하시겠습니까?` : `${text}되었습니다.`}
          </p>
        </div>
        <div className="mt-12 flex">
          {isCommentConfirm && (
            <button
              onClick={handleClose}
              className="flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg"
            >
              취소
            </button>
          )}
          {isCommentConfirm ? (
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

export default CommentModal;

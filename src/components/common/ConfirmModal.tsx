import XButton from "@/assets/images/honeytips/BigX.svg";

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
};

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  text,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%] max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onCancel}>
              <XButton />
            </button>
          </div>
          <p className="text-center text-lg">
            {text}하시겠습니까?
          </p>
        </div>
        <div className="mt-12 flex">
          <button
            onClick={onCancel}
            className="flex-1 !rounded-none !rounded-bl border border-base-300 !text-lg"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

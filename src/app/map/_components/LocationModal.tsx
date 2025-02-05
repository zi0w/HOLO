"use client";

import type { ModalContent } from "@/app/map/_types/modal";
import { getModalContent } from "@/app/map/constants/modalContent";
import CloseIcon from "@/assets/images/common/close-icon.svg";
import {
  useLocationModalStore,
  type LocationModalType,
} from "@/store/useLocationModalStore";

type LocationModalProps = {
  isOpen: boolean;
  modalType: LocationModalType | null;
  customText?: ModalContent; // 선택적으로 커스텀 텍스트 전달 가능
  onAction: () => void;
  onClose: () => void;
};

const LocationModal = ({
  isOpen,
  modalType,
  customText,
  onAction,
  onClose,
}: LocationModalProps) => {
  const { onActionCallback } = useLocationModalStore();
  const { mainText, buttonText } = getModalContent(modalType, customText);

  const handleAction = () => {
    onAction();
    onActionCallback?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-800 bg-opacity-30">
      <div className="w-4/5 max-w-md rounded bg-white shadow-lg">
        <div className="p-1">
          <div className="mb-5 flex items-center justify-end">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="whitespace-pre-line text-center">{mainText}</p>
        </div>
        <div className="mt-12 flex">
          <button
            className="common-btn type-a flex-1 !rounded-t-none !rounded-bl-none !text-base text-base-800"
            onClick={handleAction}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default LocationModal;

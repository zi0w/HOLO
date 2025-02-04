"use client";
import CloseIcon from "@/assets/images/common/close-icon.svg";
import {
  useLocationModalStore,
  type LocationModalType,
} from "@/store/locationmodal/useLocationModal";

type ModalContent = {
  mainText: string;
  buttonText: string;
};
type LocationModalProps = {
  isOpen: boolean;
  modalType: LocationModalType | null;
  customText?: ModalContent; // 선택적으로 커스텀 텍스트 전달 가능
  onAction: () => void;
  onClose: () => void;
};
const defaultModalContent: Record<LocationModalType, ModalContent> = {
  permission: {
    mainText: "위치 권한을 허용하시겠습니까?",
    buttonText: "허용",
  },
  error: {
    mainText: "위치 권한이 거부되었습니다.\n설정에서 권한을 허용해주세요.",
    buttonText: "설정으로 이동",
  },
  guide: {
    mainText: "위치 서비스 사용을 위해\n권한을 허용해주세요.",
    buttonText: "확인",
  },
};
const getModalContent = (
  type: LocationModalType | null,
  customText?: ModalContent,
): ModalContent => {
  if (!type) return { mainText: "", buttonText: "" };
  // customText가 있으면 customText 사용, 없으면 기본 텍스트 사용
  return customText || defaultModalContent[type];
};
const LocationModal = ({
  isOpen,
  modalType,
  customText,
  onAction,
  onClose,
}: LocationModalProps) => {
  const { onActionCallback } = useLocationModalStore();

  if (!isOpen) return null;

  const { mainText, buttonText } = getModalContent(modalType, customText);

  const handleAction = () => {
    onAction();
    onActionCallback?.();
  };
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

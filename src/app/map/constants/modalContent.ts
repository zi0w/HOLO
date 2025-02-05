import type { ModalContent } from "@/app/map/_types/modal";
import type { LocationModalType } from "@/store/useLocationModalStore";

export const defaultModalContent: Record<LocationModalType, ModalContent> = {
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

export const getModalContent = (
  type: LocationModalType | null,
  customText?: ModalContent,
): ModalContent => {
  if (!type) return { mainText: "", buttonText: "" };
  // customText가 있으면 customText 사용, 없으면 기본 텍스트 사용
  return customText || defaultModalContent[type];
};

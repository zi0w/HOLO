import { toPng } from "html-to-image";

export const captureElementAsImage = async (
  elementId: string,
): Promise<string | null> => {
  try {
    const element = document.querySelector(`#${elementId}`) as HTMLElement;
    if (!element) throw new Error("캡쳐할 요소를 찾을 수 없습니다.");

    const dataUrl = await toPng(element, {
      backgroundColor: "#ffffff",
    });

    return dataUrl;
  } catch (error) {
    console.error("결과 저장 중 오류가 발생했습니다.", error);
    alert("결과 저장에 실패했습니다.");
    return null;
  }
};

import Download from "@/assets/images/daily/download.svg";
import { captureElementAsImage } from "@/lib/utils/daily/htmlToImage";
import { saveAs } from "file-saver";

type SaveResultButtonProps = {
  elementId: string;
};

const SaveResultButton = ({ elementId }: SaveResultButtonProps) => {
  const handleSave = async () => {
    try {
      const dataURL = await captureElementAsImage(elementId);
      if (!dataURL) {
        throw new Error("이미지를 캡쳐하는 데 실패했습니다.");
      }
      saveAs(dataURL, "result.png");
    } catch (error) {
      console.error(error);
      alert("결과 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button onClick={handleSave}>
      <Download />
    </button>
  );
};

export default SaveResultButton;

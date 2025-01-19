import { captureElementAsImage } from "@/lib/utils/daily/html2canvas";
import { saveAs } from "file-saver";
import Download from "@/assets/images/daily/download.svg"

type SaveResultButtonProps = {
  elementId: string;
};

const SaveResultButton = ({ elementId }: SaveResultButtonProps) => {
  const handleSave = async () => {
    try {
        const dataURL = await captureElementAsImage(elementId)
        if (!dataURL) {
            throw new Error("이미지를 캡쳐하는 데 실패했습니다.")
        }
        saveAs(dataURL, "result.png");
    } catch (error) {
        console.error(error);
        alert("결과 저장에 실패했습니다. 다시 시도해주세요.")
    }
  };

  return (
    <Download>
        <button onClick={handleSave} />
    </Download>
  )
};

export default SaveResultButton
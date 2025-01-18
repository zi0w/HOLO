export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        alert("링크가 클립보드에 복사되었습니다!")
    } catch (error) {
        console.error("링크를 복사하지 못했습니다.", error);
        alert("결과 공유에 실패했습니다. 다시 시도해주세요.")
    }
}
export const generateShareLink = async (resultData: string) => {
    const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({data: resultData})
    })

    if (!response.ok) {
      alert("결과 공유에 실패했습니다. 다시 시도해주세요.");
      throw new Error("데이터 저장 실패");
    }

    const {id} = await response.json();
    return `${window.location.origin}/recommend/result?id=${id}`
}
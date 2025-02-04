"use server";

import { fetchOpenAIResponse } from "@/lib/utils/openai";

const fetchDailyFortune = async (): Promise<string> => {
  const prompt =
    "내 오늘 운세를 알려줘! 존댓말로 다른 내용 없이 딱 운세 내용 요약 10글자 이내로 짧게 키워드로만 적고, 부연 설명 두 줄 정도로 나눠서 알려줘 그리고 꼭 요약 키워드와 부연 설명을 슬래시로 나눠서 보내줘 그리고 슬래시와 글 사이에는 무조건 스페이스 한 번씩 넣어줘 그리고 영어는 절대 포함시키지 말아줘 매 요청마다 내용이 중복되지 않게 긍정적인 내용 50% 확률, 부정적인 내용 50% 확률로 둘 중 하나 선택해서 얘기해줘";

  return fetchOpenAIResponse(prompt, "오늘의 운세 받아오는 데에 실패했습니다.");
};

export default fetchDailyFortune;
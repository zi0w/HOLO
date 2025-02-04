"use server";

import { fetchOpenAIResponse } from "@/lib/utils/openai";

const fetchDailyFortune = async (): Promise<string> => {
  const prompt =
    "내 오늘 운세를 알려줘! 다른 내용 없이 딱 운세 내용만 한 줄로 알려줘 매 요청마다 내용이 중복되지 않게 긍정적인 내용 50% 확률, 부정적인 내용 50% 확률로 둘 중 하나 선택해서 얘기해줘";

  return fetchOpenAIResponse(prompt, "오늘의 운세 받아오는 데에 실패했습니다.");
};

export default fetchDailyFortune;
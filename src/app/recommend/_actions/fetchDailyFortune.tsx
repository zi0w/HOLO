"use server";

import OpenAI from "openai";

const fetchDailyFortune = async (): Promise<string> => {
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content:
            "내 오늘 운세를 알려줘! 다른 내용 없이 딱 운세 내용만 한 줄로 알려줘 매 요청마다 내용이 중복되지 않게 긍정적인 내용 50% 확률, 부정적인 내용 50% 확률로 둘 중 하나 선택해서 얘기해줘",
        },
      ],
    });

    return completion.choices[0].message.content as string;
  } catch (error) {
    console.error(error);
    throw new Error("오늘의 운세 받아오는 데에 실패했습니다.");
  }
};

export default fetchDailyFortune;

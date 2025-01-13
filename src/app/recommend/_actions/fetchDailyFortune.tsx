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
            "내가 지금 포츈쿠키를 열었다고 생각하고, 거기서 나올 내 오늘 운세를 알려줘! 다른 내용 없이 딱 운세 내용만 알려줘",
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

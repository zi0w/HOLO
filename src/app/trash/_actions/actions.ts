"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const fetchOpenAiDay = async (
  regionData: string,
  districtData: string,
) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content: ` 답변 양식은 
          ${regionData} ${districtData}의 배출요일을 재활용, 일반 쓰레기, 대형 쓰레기, 음식물 쓰레기순으로 "매주 무슨요일"까지만 알려줘 대신 매일이면, 매주빼서 "매일"이라고만 알려줘 그외 배출 요일은 다음과 같습니다라는 문구라던가 필요없는 내용은 제외해줘`,
        },
      ],
    });
    const completionContent = completion.choices[0].message.content;
    const res = completionContent
      ?.split("\n")
      .map((item) => item.replace("- ", "").trim())
      .filter(Boolean)
      .map((item) => {
        const [wasteName, wasteDay] = item
          .split(":")
          .map((part) => part.trim());
        return { [wasteName]: wasteDay };
      });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("OpenAI 오류인데 여긴 쓰레기 배출 알려주는 오류임!");
  }
};

export const fetchOpenAiFoodWaste = async (foodWasteData: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content: `${foodWasteData}(이)가 음식물 쓰레기이면 true로 음식물 쓰레기가 아니면 false로 불리언값만 줘`,
        },
      ],
    });
    return completion;
  } catch (error) {
    console.error(error);
    throw new Error(
      "OpenAI 오류인데 여긴 음식물쓰레기 여부를 알려주는 오류임!",
    );
  }
};

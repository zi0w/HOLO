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
          ${regionData}의 ${districtData}의 배출요일을 재활용, 일반 쓰레기, 대형 쓰레기, 음식물 쓰레기순으로 "매주 무슨요일"까지만 알려줘 대신 매일이면, 매주빼서 "매일"이라고만 알려줘 그외 배출 요일은 다음과 같습니다라는 문구라던가 필요없는 내용은 제외해줘`,
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
    throw new Error("쓰레기 배출을 알려주는 OpenAI 오류가 발생했습니다.");
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
    return {
      content: completion.choices[0]?.message?.content || "",
    };
  } catch (error) {
    console.error(error);
    throw new Error("음식물쓰레기 여부를 알려주는 OpenAI 오류가 발생했습니다.");
  }
};

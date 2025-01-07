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
          content: `${regionData} ${districtData}의 쓰레기 종류별로 배출요일을 각각 문단으로 구분해서 아주 간략하게 줄여서 알려줘`,
        },
      ],
    });
    if (completion.choices && completion.choices.length > 0) {
      const responseContent = completion.choices[0].message.content;
      if (responseContent) {
        const paragraphs = responseContent.split("\n\n");
        return paragraphs;
      }
    }

    return [];
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
          content: `${foodWasteData}(이)가 음식물 쓰레기이면 "음식물 쓰레기입니다"로, 아니면 "음식물 쓰레기가 아닙니다"로 알려줘`,
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

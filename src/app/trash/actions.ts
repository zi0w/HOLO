"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const fetchOpenAiAnswer = async (
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
          content: `${regionData} ${districtData}의 쓰레기 종류별로 배출요일을 각각 문단으로 구분해서 알려줘`,
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
    throw new Error("OpenAI 오류!");
  }
};

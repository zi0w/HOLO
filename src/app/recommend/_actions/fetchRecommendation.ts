"use server";

import type { Answer } from "@/app/recommend/_types/answer";
import OpenAI from "openai";

const fetchRecommendation = async (answerData: Answer): Promise<string> => {
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content: `오늘 먹을 메뉴 한 가지만 추천해줘 오늘 내 기분은 ${answerData.answer1}. 그리고 ${answerData.answer2} 종류의 음식이 땡기고, 매운 음식은 ${answerData.answer3}. 그리고 다이어트 여부는 ${answerData.answer4} 추가적으로 볼드체 강조표시 사용하지 말아줘(**), 존댓말로 답변해줘, 무조건 한국어로만 답변해줘, 그리고 꼭 메뉴명과 추천 이유를 슬래시로 나눠서 보내줘 그리고 슬래시와 글 사이에는 무조건 스페이스 한 번씩 넣어줘 그리고 영어는 절대 포함시키지 말아줘`,
        },
      ],
    });

    return completion.choices[0].message.content as string;
  } catch (error) {
    console.error(error);
    throw new Error("추천 메뉴를 받아오는 데에 실패했습니다.");
  }
};

export default fetchRecommendation;

// "use server";

// import { fetchOpenAIResponse } from "@/utils/openai";
// import type { Answer } from "@/app/recommend/_types/answer";

// const fetchRecommendation = async (answerData: Answer): Promise<string> => {
//   const prompt = `오늘 먹을 메뉴 한 가지만 추천해줘 오늘 내 기분은 ${answerData.answer1}. 그리고 ${answerData.answer2} 종류의 음식이 땡기고, 매운 음식은 ${answerData.answer3}. 그리고 다이어트 여부는 ${answerData.answer4} 추가적으로 볼드체 강조표시 사용하지 말아줘(**), 존댓말로 답변해줘, 무조건 한국어로만 답변해줘, 그리고 꼭 메뉴명과 추천 이유를 슬래시로 나눠서 보내줘 그리고 슬래시와 글 사이에는 무조건 스페이스 한 번씩 넣어줘 그리고 영어는 절대 포함시키지 말아줘`;

//   return fetchOpenAIResponse(prompt, "추천 메뉴를 받아오는 데에 실패했습니다.");
// };

// export default fetchRecommendation;
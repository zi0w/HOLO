"use server";

import type { WasteSchedule } from "@/app/trash-guide/_types/trashTypes";
import { fetchOpenAIResponse } from "@/lib/utils/openai";

const ERROR_MESSAGES = {
  TRASH_SCHEDULE: "쓰레기 배출을 알려주는 OpenAI 오류가 발생했습니다.",
  FOOD_WASTE: "음식물쓰레기 여부를 알려주는 OpenAI 오류가 발생했습니다.",
} as const;

// 프롬프트
const createSchedulePrompt = (regionData: string) =>
  `${regionData}의 쓰레기 종류별 배출 요일을 알려줘.
  다음 순서대로 각 쓰레기 종류의 배출 요일을 알려주되:
  - 재활용
  - 일반 쓰레기
  - 대형 쓰레기
  - 음식물 쓰레기

  응답 형식:
  - 매일 배출 가능한 경우: "매일"로만 답변
  - 여러 요일에 배출 가능한 경우: 해당 지역의 실제 배출 가능한 모든 요일을 "매주 요일1, 요일2, 요일3, 요일4" 형식으로 답변
  - 한 요일에만 배출 가능한 경우: "매주 요일" 형식으로 답변
  - 각 쓰레기 종류를 "종류: 배출일" 형식으로 한 줄씩 작성
  
  반드시 해당 지역의 실제 배출 요일을 확인하여 답변해줘. 예시는 참고만 하고 실제 데이터로 응답해줘. 그외 배출 요일은 다음과 같습니다라는 문구라던가 필요없는 내용은 제외해줘.`;

const createFoodWastePrompt = (foodWasteData: string) =>
  `${foodWasteData}이(가) 음식물 쓰레기인지 판단해줘.
  - 음식물 쓰레기 분류 기준:
    * 과일/채소류의 씨앗, 껍질
    * 생선살, 내장
    * 일반 육류
    * 밥, 면류, 빵류
    * 각종 음식물 찌꺼기
  - 음식물 쓰레기가 아닌 것:
    * 딱딱한 껍데기(조개, 굴, 전복, 꽃게 등)
    * 뼈류(생선뼈, 닭뼈, 돼지뼈 등)
    * 과일의 딱딱한 씨(복숭아, 감, 아보카도 등)
    * 달걀 껍데기
    * 마른 미역, 다시마
  위 기준에 따라 ${foodWasteData}이(가) 음식물 쓰레기면 true, 아니면 false로만 답변해줘`;

// 쓰레기 배출 요일
export const fetchOpenAiDay = async (
  regionData: string,
): Promise<WasteSchedule[]> => {
  try {
    const completionContent = await fetchOpenAIResponse(
      createSchedulePrompt(regionData),
      ERROR_MESSAGES.TRASH_SCHEDULE,
    );

    if (!completionContent) return [];

    return completionContent
      .split("\n")
      .map((item) => item.replace("- ", "").trim())
      .filter((item) => item && item.includes(":"))
      .map((item) => {
        const [wasteName, wasteDay] = item
          .split(":")
          .map((part) => part.trim());
        return wasteName && wasteDay ? { [wasteName]: wasteDay } : null;
      })
      .filter((item) => item !== null);
  } catch (error) {
    console.error(error);
    throw new Error("쓰레기 배출 정보를 가져오는데 실패했습니다.");
  }
};

// 음식물 쓰레기 여부
export const fetchOpenAiFoodWaste = async (foodWasteData: string) => {
  const content = await fetchOpenAIResponse(
    createFoodWastePrompt(foodWasteData),
    ERROR_MESSAGES.FOOD_WASTE,
  );

  return { content };
};

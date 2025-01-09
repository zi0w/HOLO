"use server"

import OpenAI from "openai"
import type { Answer } from "../_types/answer";

const fetchRecommendation = async (answerData: Answer): Promise<string> => {
    const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [{
                role: "user",
                content: `오늘 먹을 메뉴 한 가지만 추천해줘 오늘 내 기분은 ${answerData.answer1}. 그리고 ${answerData.answer2}류의 음식이 땡기고, 매운 음식은 ${answerData.answer3}. 그리고 다이어트 여부는 ${answerData.answer4}`
            }]
        })

        return completion.choices[0].message.content as string
    } catch (error) {
        console.error(error);
        throw new Error("추천 메뉴 받아오기 실패!")
    }
}

export default fetchRecommendation
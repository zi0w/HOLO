import type { Answer } from "@/app/recommend/_types/answer"

type Question = {
    id: keyof Answer;
    question: string;
    answers: string[]
}

export const QUESTIONS:Question[] = [
    {
        id: "answer1",
        question: "오늘 기분이 어떤가요?",
        answers: ["좋아요", "슬퍼요", "화나요", "그냥그래요"]
    },
    {
        id: "answer2",
        question: "어떤 음식이 당기나요?", 
        answers: ["한식", "일식", "양식", "중식"]
    },
    {
        id: "answer3",
        question: "매운 음식 어때요?",
        answers: ["좋아요", "싫어요"]
    },
    {
        id: "answer4",
        question: "다이어트 중이신가요?",
        answers: ["네", "아니요"]
    }
]
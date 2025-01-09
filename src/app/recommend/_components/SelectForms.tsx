"use client"

import { useState } from "react";
import { useFunnel } from "@/app/recommend/_hooks/useFunnel";
import type { Answer } from "@/app/recommend/_types/answer";
import Result from "@/app/recommend/_components/Result"
import { questions } from "@/app/recommend/_constants/questions";
import Question from "@/app/recommend/_components/Question";

const steps = [...questions.map((q) =>  q.id), "result"];

const SelectForms = () => {
  const { Funnel, Step, next, prev } = useFunnel(steps[0]);
  const [answerData, setAnswerData] = useState<Answer>({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  const handleNext = (data: Partial<Answer>, nextStep: string) => {
    setAnswerData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (data: Partial<Answer>, prevStep: string) => {
    setAnswerData((prev) => ({...prev, ...data}))
    prev(prevStep);
  };

  return (
    <Funnel>
      {[...questions.map((q, index) => (
        <Step key={q.id} name={q.id}>
          <Question 
            question={q.question}
            selectedAnswer={answerData[q.id]}
            answerItems={q.answers}
            onNext={(data) => handleNext(data, steps[index + 1])}
            onPrev={(data) => handlePrev(data, steps[index - 1])}
            fieldKey={q.id}
          />
        </Step>
      )),
      <Step name={steps[4]}>
        <Result answerData={answerData} />
      </Step>]}
    </Funnel>
  );
};

export default SelectForms;

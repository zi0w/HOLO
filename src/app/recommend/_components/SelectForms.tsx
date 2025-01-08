"use client"

import { useState } from "react";
import { useFunnel } from "@/app/recommend/_hooks/useFunnel";
import type { Answer } from "@/app/recommend/_types/answer";
import Question1 from "@/app/recommend/_components/Question1";
import Question2 from "@/app/recommend/_components/Question2";
import Question3 from "@/app/recommend/_components/Question3";
import Question4 from "@/app/recommend/_components/Question4";
import Result from "@/app/recommend/_components/Result"

const steps = ["question1", "question2", "question3", "question4", "result"];

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
    setAnswerData((prev) => ({ ...prev, ...data }));
    prev(prevStep);
  };

  return (
    <Funnel>
      <Step name={steps[0]}>
        <Question1
          prevAnswer={answerData.answer1}
          onNext={(data) => {
            handleNext(data, steps[1]);
          }}
        />
      </Step>
      <Step name={steps[1]}>
        <Question2
          prevAnswer={answerData.answer2}
          onNext={(data) => {
            handleNext(data, steps[2]);
          }}
          onPrev={(data) => {
            handlePrev(data, steps[0]);
          }}
        />
      </Step>
      <Step name={steps[2]}>
        <Question3
          prevAnswer={answerData.answer3}
          onNext={(data) => {
            handleNext(data, steps[3]);
          }}
          onPrev={(data) => {
            handlePrev(data, steps[1]);
          }}
        />
      </Step>
      <Step name={steps[3]}>
        <Question4
          prevAnswer={answerData.answer4}
          onNext={(data) => {
            handleNext(data, steps[4]);
          }}
          onPrev={(data) => {
            handlePrev(data, steps[2]);
          }}
        />
      </Step>
      <Step name={steps[4]}>
        <Result />
      </Step>
    </Funnel>
  );
};

export default SelectForms;

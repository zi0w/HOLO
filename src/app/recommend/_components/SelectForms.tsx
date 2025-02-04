"use client";

import { Funnel, Step } from "@/app/recommend/_components/Funnel";
import ProgressBar from "@/app/recommend/_components/ProgressBar";
import Question from "@/app/recommend/_components/Question";
import Result from "@/app/recommend/_components/Result";
import { QUESTIONS } from "@/app/recommend/_constants/questions";
import { useFunnel } from "@/app/recommend/_hooks/useFunnel";
import type { Answer } from "@/app/recommend/_types/answer";
import { useState } from "react";

const steps = [...QUESTIONS.map((q) => q.id), "result"];

const SelectForms = () => {
  const { next, prev, currentStep } = useFunnel(steps[0]);
  const [answerData, setAnswerData] = useState<Answer>({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  const currentLevel = steps.indexOf(currentStep) + 1;

  const isResultPage = currentStep === steps[steps.length - 1];
  const stepFraction = `${currentLevel}/${steps.length - 1}`;
  const progressPercentage = Math.round(
    (currentLevel / (steps.length - 1)) * 100,
  );

  const handleNext = (data: Partial<Answer>, nextStep: string) => {
    setAnswerData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (data: Partial<Answer>, prevStep: string) => {
    setAnswerData((prev) => ({ ...prev, ...data }));
    if (steps.indexOf(prevStep) >= 0) prev(prevStep);
  };

  return (
    <div className="block items-center justify-center lg:flex lg:h-screen">
      <div className="mt-4 w-full px-5 lg:mx-auto lg:max-w-xl lg:rounded-3xl lg:border lg:border-primary-500 lg:px-20">
        {!isResultPage && (
          <ProgressBar
            start={0}
            end={progressPercentage}
            label={stepFraction}
          />
        )}
        <Funnel currentStep={currentStep}>
          {[
            ...QUESTIONS.map((q, index) => (
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
            // 배열로 묶였기에 key 필요
            <Step key="result" name={steps[4]}>
              <Result answerData={answerData} />
            </Step>,
          ]}
        </Funnel>
      </div>
    </div>
  );
};

export default SelectForms;

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useFunnel = (initialStep: string) => {
  const searchParams = useSearchParams();
  // 초기 상태 설정
  const [currentStep, setCurrentStep] = useState<string>(
    () => searchParams.get("step") || initialStep,
  );

  // 상태와 url 동기화
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      setCurrentStep(stepParam);
    } else {
      window.history.replaceState(null, "", `?step=${currentStep}`);
    }
  }, [searchParams]);

  const updateStep = (step: string): void => {
    setCurrentStep(step);
    window.history.pushState(null, "", `?step=${step}`);
  };

  const next = (nextStep: string): void => {
    updateStep(nextStep);
  };

  const prev = (prevStep: string): void => {
    updateStep(prevStep);
  };

  return { next, prev, currentStep };
};

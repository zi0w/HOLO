import PolicyResultCard from "@/app/policy/_components/PolicyResultCard";
import type { PolicyData } from "@/app/policy/_types/policy";
import { useState } from "react";

type PolicyResultProps = {
  error: Error | null;
  isLoading: boolean;
  policyData: PolicyData[] | PolicyData | null;
};

const PolicyResult = ({ error, isLoading, policyData }: PolicyResultProps) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  if (error instanceof Error) {
    return <div className="text-red-500">에러: {error.message}</div>; //TODO: 에러 메시지 추가
  }

  if (isLoading) {
    return <div>조회 중...</div>; //TODO: 로딩 스피너 추가
  }

  if (policyData === null) {
    return <div>지역 및 정책 분야를 선택해주세요.</div>;
  }

  if (Array.isArray(policyData) && policyData.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="grid gap-4">
      {isLoadingPage ? (
        <p>로딩중...</p> //TODO: 로딩 스피너 추가
      ) : Array.isArray(policyData) ? (
        policyData.map((policy) => (
          <PolicyResultCard
            key={policy.bizId}
            policy={policy}
            setIsLoadingPage={setIsLoadingPage}
          />
        ))
      ) : (
        policyData && (
          <PolicyResultCard
            key={policyData.bizId}
            policy={policyData}
            setIsLoadingPage={setIsLoadingPage}
          />
        )
      )}
    </div>
  );
};

export default PolicyResult;

import PolicyLink from "@/app/policy/_components/PolicyLink";
import type { PolicyData } from "@/app/policy/_types/policy";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PolicyResultProps = {
  error: Error | null;
  policyData: PolicyData[] | null;
};

const PolicyResult = ({ error, policyData }: PolicyResultProps) => {
  const router = useRouter();
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  if (error) return <div className="text-red-500">에러: {error.message}</div>;
  if (!policyData) return <div>지역 및 정책 분야를 선택해주세요.</div>;

  if (Array.isArray(policyData) && policyData.length === 0) {
    return (
      <div className="mt-5 text-center text-base-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent, bizId: string) => {
    e.preventDefault();
    setIsLoadingPage(true);
    router.push(`/policy/${bizId}`);
  };
  return (
    <div className="mt-8 grid gap-4">
      {isLoadingPage ? (
        <p>로딩중... </p>
      ) : (
        policyData?.map((policy) => (
          <PolicyLink
            key={policy.bizId}
            policy={policy}
            onClick={handleClick}
          />
        ))
      )}
    </div>
  );
};

export default PolicyResult;

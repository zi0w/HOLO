import PolicyResultCard from "@/app/policy/_components/PolicyResultCard";
import type { PolicyData } from "@/app/policy/_types/policy";

type PolicyResultProps = {
  error: Error | null;
  isPending: boolean;
  policyData: PolicyData[] | null;
};

const PolicyResult = ({ error, isPending, policyData }: PolicyResultProps) => {
  if (error instanceof Error) {
    return <div className="text-red-500">에러: {error.message}</div>;
  }

  if (isPending) {
    return <div>조회 중...</div>;
  }

  if (!policyData) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="grid gap-4">
      {policyData.map((policy) => (
        <PolicyResultCard key={policy.bizId} policy={policy} />
      ))}
    </div>
  );
};

export default PolicyResult;

import type { PolicyData } from "@/app/policy/_types/policy";
import Link from "next/link";

type PolicyResultProps = {
  error: Error | null;
  isFetching: boolean;
  policyData: PolicyData[] | null;
};

const PolicyResult = ({ error, isFetching, policyData }: PolicyResultProps) => {
  if (error instanceof Error) return <div>에러: {error.message}</div>; //TODO: 에러 변경

  return (
    <div className="grid gap-4">
      {isFetching && <div>조회 중...</div>}
      {!isFetching &&
        policyData &&
        policyData.map((policy) => (
          <Link
            href={`/policy/${policy.bizId}`}
            key={policy.bizId}
            className="cursor-pointer rounded-lg border p-4 hover:bg-gray-50"
          >
            <h3>{policy.polyBizSjnm}</h3>
          </Link>
        ))}
    </div>
  );
};

export default PolicyResult;

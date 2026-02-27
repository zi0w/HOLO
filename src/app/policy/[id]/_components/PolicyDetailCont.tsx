"use client";

import PolicyDetailItem from "@/app/policy/[id]/_components/PolicyDetailItem";
import { fetchPolicyDetail } from "@/app/policy/_actions/fetchPolicyDetail";
import { POLICY_DISPLAY_NAMES } from "@/app/policy/_constants/policy";
import { useQuery } from "@tanstack/react-query";

type PolicyDetailContProps = {
  params: { id: string };
};

const PolicyDetailCont = ({ params: { id } }: PolicyDetailContProps) => {
  const { data } = useQuery({
    queryKey: ["policyDetail", id],
    queryFn: () => fetchPolicyDetail(id),
  });

  const policyDetailData = data?.result.youthPolicyList[0];

  if (!policyDetailData) return null;

  return (
    <>
      <p className="mb-8 break-keep font-bold text-base-800">
        {policyDetailData.plcyNm}
      </p>
      <ul className="space-y-4">
        {Object.entries(POLICY_DISPLAY_NAMES).map(
          ([fieldName, displayName]) => (
            <PolicyDetailItem
              key={fieldName}
              fieldName={fieldName}
              displayName={displayName}
              value={
                policyDetailData[fieldName as keyof typeof policyDetailData]
              }
            />
          ),
        )}
      </ul>
    </>
  );
};

export default PolicyDetailCont;

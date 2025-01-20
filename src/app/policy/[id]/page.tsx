import PolicyDetailItem from "@/app/policy/[id]/_components/PolicyDetailItem";
import { fetchPolicyDetail } from "@/app/policy/_actions/fetchPolicyDetail";
import { POLICY_DISPLAY_NAMES } from "@/app/policy/_constants/policy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정책 상세",
  description: "정책 상세 페이지",
  openGraph: {
    title: "정책 상세",
    description: "정책 상세 페이지",
  },
};

const policyDetailData = async (id: string) => {
  return fetchPolicyDetail(id);
};

const PolicyDetailPage = async ({ params }: { params: { id: string } }) => {
  const policyInfo = await policyDetailData(params.id);

  return (
    <>
      <p className="mb-8 break-keep font-bold text-base-800">
        {policyInfo.polyBizSjnm}
      </p>
      <ul className="space-y-4">
        {Object.entries(POLICY_DISPLAY_NAMES).map(
          ([fieldName, displayName]) => (
            <PolicyDetailItem
              key={fieldName}
              fieldName={fieldName}
              displayName={displayName}
              policyInfo={policyInfo}
            />
          ),
        )}
      </ul>
    </>
  );
};

export default PolicyDetailPage;

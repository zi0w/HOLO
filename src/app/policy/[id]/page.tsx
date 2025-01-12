import useFormatPolicyField from "@/app/policy/_hooks/useFormatPolicyField";
import type { PolicyData } from "@/app/policy/_types/policy";

const getPolicyDetail = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/policy/${id}`,
  );
  if (!res.ok) {
    throw new Error("정책 상세 정보를 불러오는데 실패했습니다.");
  }
  return res.json();
};

const POLICY_DISPLAY_NAMES = {
  polyBizSjnm: "정책명",
  cnsgNmor: "운영기관명",
  polyItcnCn: "정책 소개",
  sporCn: "지원 내용",
  rqutPrdCn: "사업 신청 기간",
  rqutProcCn: "신청 절차",
  rqutUrla: "신청 사이트 주소",
  rfcSiteUrla1: "참고 사이트",
} as const;

const PolicyDetailContent = ({ policyInfo }: { policyInfo: PolicyData }) => {
  const formatPolicyField = useFormatPolicyField(policyInfo);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center text-2xl font-bold">
        {policyInfo.polyBizSjnm}
      </h2>
      <ul className="space-y-4">
        {Object.entries(POLICY_DISPLAY_NAMES).map(
          ([fieldName, displayName]) => (
            <li key={fieldName} className="flex flex-col md:flex-row md:gap-5">
              <strong className="whitespace-nowrap">{displayName}</strong>
              <p className="break-keep">
                {formatPolicyField(fieldName as keyof PolicyData)}
              </p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

const PolicyDetailPage = async ({ params }: { params: { id: string } }) => {
  const policyInfo = await getPolicyDetail(params.id);

  return <PolicyDetailContent policyInfo={policyInfo} />;
};

export default PolicyDetailPage;

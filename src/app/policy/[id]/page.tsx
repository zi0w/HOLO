import PolicyDetailContent from "@/app/policy/[id]/_components/PolicyDetailContent";
import { getPolicyDetail } from "@/app/policy/_actions/getPolicyDetail";
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
  return getPolicyDetail(id);
};

const PolicyDetailPage = async ({ params }: { params: { id: string } }) => {
  const policyInfo = await policyDetailData(params.id);

  return <PolicyDetailContent policyInfo={policyInfo} />;
};

export default PolicyDetailPage;

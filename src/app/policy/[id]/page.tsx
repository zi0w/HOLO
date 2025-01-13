import PolicyDetailContent from "@/app/policy/[id]/_components/PolicyDetailContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정책 상세",
  description: "정책 상세 페이지",
};

const getPolicyDetail = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/policy/${id}`,
  );
  if (!res.ok) {
    throw new Error("정책 상세 정보를 불러오는데 실패했습니다.");
  }
  return res.json();
};

const PolicyDetailPage = async ({ params }: { params: { id: string } }) => {
  const policyInfo = await getPolicyDetail(params.id);

  return <PolicyDetailContent policyInfo={policyInfo} />;
};

export default PolicyDetailPage;

import type { Metadata } from "next";
import PolicyDetailCont from "./_components/PolicyDetailCont";

export const metadata: Metadata = {
  title: "정책 상세",
  description: "정책 상세 페이지",
  openGraph: {
    title: "정책 상세",
    description: "정책 상세 페이지",
  },
};

const PolicyDetailPage = async ({ params }: { params: { id: string } }) => {
  return <PolicyDetailCont params={params} />;
};

export default PolicyDetailPage;

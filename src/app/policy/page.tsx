// import PolicyCont from "@/app/policy/_components/PolicyCont";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청년 정책",
  description: "청년들을 위한 정책 제공",
  openGraph: {
    title: "청년 정책",
    description: "청년들을 위한 정책 제공",
  },
};

const page = () => {
  return (
    <>
      <p className="mb-4 font-bold text-base-800 text-center">서비스 점검중입니다.</p>
      {/* <PolicyCont /> */}
    </>
  );
};

export default page;

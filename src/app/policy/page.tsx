// import PolicyCont from "@/app/policy/_components/PolicyCont";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "청년 정책",
  description: "청년들을 위한 정책 제공",
  openGraph: {
    title: "청년 정책",
    description: "청년들을 위한 정책 제공",
    url: `${process.env.NEXT_PUBLIC_API_URL}/policy`,
  },
};

const page = () => {
  return (
    <>
      <p className="mb-4 text-center font-bold text-base-800">
        서비스 점검중입니다.
      </p>
      {/* <PolicyCont /> */}
    </>
  );
};

export default page;

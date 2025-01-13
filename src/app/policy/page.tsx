import PolicyCont from "@/app/policy/_components/PolicyCont";
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
    <div>
      <div>
        <h2>청년 정책</h2>
        <p>청년들을 위한 정책 제공</p>
      </div>
      <PolicyCont />
    </div>
  );
};

export default page;

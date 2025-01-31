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
      <p className="mb-4 break-keep text-sm text-base-800">
        <strong className="mb-2 block text-lg">
          [일시적인 서비스 중단 안내]
        </strong>
        현재 청년 정책 정보를 제공하는 API가 사정상 2월까지 일시적으로
        중단됩니다. <br />
        이용에 불편을 드려 죄송하며, 빠르게 복구하도록
        노력하겠습니다.
      </p>

      {/* <p className="mb-4 font-bold text-base-800">지역 및 정책 분야 선택</p> */}
      {/* <PolicyCont /> */}
    </>
  );
};

export default page;

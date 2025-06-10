import Result from "@/app/fortune/_components/Result";
import Loading from "@/components/common/Loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "오늘의 운세 뽑기",
  description: "오늘의 운세를 알려줄 포춘쿠키는? 직감적으로 하나만 골라보세요!",
  openGraph: {
    title: "오늘의 운세 뽑기",
    description:
      "오늘의 운세를 알려줄 포춘쿠키는? 직감적으로 하나만 골라보세요!",
    url: "https://holo-psi.vercel.app/fortune/result",
  },
};

const FortunePage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Result />
      </Suspense>
    </div>
  )
};

export default FortunePage;

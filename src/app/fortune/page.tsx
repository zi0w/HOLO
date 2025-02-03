import FortuneItem from "@/app/fortune/_components/FortuneItem";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 운세 뽑기",
  description: "오늘의 운세를 알려줄 포춘쿠키는? 직감적으로 하나만 골라보세요!",
  openGraph: {
    title: "오늘의 운세 뽑기",
    description:
      "오늘의 운세를 알려줄 포춘쿠키는? 직감적으로 하나만 골라보세요!",
    url: "https://holo-psi.vercel.app/fortune",
  },
};

const fortunePage = () => {
  return (
    <div className="mt-4 flex h-full flex-col items-center bg-white lg:border lg:mt-40 lg:max-h-[700px] lg:max-w-lg lg:mx-auto lg:border-primary-500 lg:rounded-3xl">
      <h1 className="mt-20 text-center text-2xl text-base-800 lg:mt-14">
        오늘의 운세를 <br />
        알려줄 포춘쿠키는?
      </h1>
      <span className="mt-1.5 text-center text-base text-primary-800">
        직감적으로! 하나만 골라보세요 :)
      </span>
      <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-6">
        <FortuneItem />
      </div>
    </div>
  );
};
export default fortunePage;

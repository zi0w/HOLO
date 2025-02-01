import person from "@/assets/images/recommend/person-recommend.png";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "오늘의 메뉴 추천",
  description: "무엇을 먹을지 고민이라면? 간단한 4문제로 메뉴를 골라볼까요?",
  openGraph: {
    title: "오늘의 메뉴 추천",
    description: "무엇을 먹을지 고민이라면? 간단한 4문제로 메뉴를 골라볼까요?",
    url: "https://holo-psi.vercel.app/recommend",
  },
};

const RecommendPage = () => {
  return (
    <div className="mt-4 flex h-full flex-col items-center bg-white">
      <h1 className="text-2xl text-base-800 mt-20">메뉴 추천</h1>
      <span className="mt-1.5 text-center text-base text-primary-800">
        무엇을 먹을지 고민이라면? <br />
        간단한 4문제로 메뉴를 골라볼까요?
      </span>
      <Image
        src={person}
        alt="person-image"
        width={396}
        height={630}
        className="fixed bottom-0 left-1/2 max-h-[500px] w-auto -translate-x-1/2"
      />
      <Link
        href="recommend/menu"
        className="fixed bottom-40 w-[calc(100%-40px)] py-[14px] text-center z-10 rounded bg-primary-500 font-gmarket font-normal text-white"
      >
        추천 받기 시작!
      </Link>
    </div>
  );
};

export default RecommendPage;

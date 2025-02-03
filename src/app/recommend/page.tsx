import desktopPerson from "@/assets/images/recommend/person-desktop.png";
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
    <div className="mt-4 flex h-full flex-col items-center bg-white lg:mt-40 lg:max-w-xl lg:mx-auto lg:justify-center lg:rounded-3xl lg:border lg:border-primary-500">
      {/* 데스크톱에서는 중앙 정렬 */}
      <h1 className="mt-20 text-2xl text-base-800 lg:mt-24">메뉴 추천</h1>
      <span className="mt-1.5 text-center text-base text-primary-800">
        무엇을 먹을지 고민이라면? <br />
        간단한 4문제로 메뉴를 골라볼까요?
      </span>
      <Link
        href="recommend/menu"
        className="fixed bottom-40 z-10 w-[calc(100%-40px)] rounded bg-primary-500 py-[14px] text-center font-gmarket font-normal text-white lg:static lg:mt-6 lg:max-w-[406px]"
      >
        추천 받기 시작!
      </Link>

      {/* 이미지 */}
      <Image
        src={person}
        alt="person-image"
        width={396}
        height={630}
        className="fixed bottom-0 left-1/2 max-h-[500px] w-auto -translate-x-1/2 lg:hidden"
      />
      <Image
        src={desktopPerson}
        alt="person-image"
        width={350}
        height={375}
        className="hidden lg:mt-20 lg:block"
      />
    </div>
  );
};

export default RecommendPage;

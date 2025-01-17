import Person from "@/assets/images/recommend/person-recommend.svg";
import Link from "next/link";

const RecommendPage = () => {
  return (
    <div className="mt-4 flex h-full flex-col items-center bg-white">
      <h1 className="text-2xl text-base-800">메뉴 추천</h1>
      <span className="mt-1.5 text-center text-base text-primary-800">
        무엇을 먹을지 고민이라면? <br />
        간단한 4문제로 메뉴를 골라볼까요?
      </span>
        <Person className="fixed bottom-0 -translate-x-1/2 left-1/2"/>
        <Link href="recommend/menu" className="font-gmarket w-[362px] h-12 flex items-center justify-center rounded bg-primary-500 text-white font-normal mt-[609px] z-10">추천 받기 시작!</Link>
    </div>
  );
};

export default RecommendPage;

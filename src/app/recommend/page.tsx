import Link from "next/link";

const RecommendPage = () => {


  return (
    <div className="m-8 flex flex-col items-center">
      <div className="flex flex-col text-center gap-4">
        <h1 className="text-3xl">오늘 뭐하지?</h1>
        <div className="flex flex-col text-sm">
          <span>오늘의 다양한 컨텐츠를 추천해드립니다.</span>
          <span>모든 답변은 OpenAI API 기반으로 생성됩니다.</span>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <Link href="recommend/menu">
        <button className="border p-2">오늘의 메뉴 추천</button>
        </Link>
        <Link href="recommend/fortune">
        <button className="border p-2">오늘의 운세</button>
        </Link>
        <button className="border p-2">오늘의 할일 추천</button>
      </div>
    </div>
  );
};

export default RecommendPage;

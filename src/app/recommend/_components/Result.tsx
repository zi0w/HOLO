import fetchRecommendation from "@/app/recommend/_actions/fetchRecommendation";
import type { Answer } from "@/app/recommend/_types/answer";
import ChineseFood from "@/assets/images/recommend/chinese-food.png";
import JapaneseFood from "@/assets/images/recommend/japanese-food.png";
import KoreanFood from "@/assets/images/recommend/korean-food.png";
import WesternFood from "@/assets/images/recommend/western-food.png";
import Loading from "@/components/common/Loading";
import SaveResultButton from "@/components/daily/SaveResultButton";
import ShareLinkButton from "@/components/daily/ShareLinkButton";
import { generateShareLink } from "@/lib/utils/daily/shareLink";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ResultProps = {
  answerData: Answer;
};

const foodImages: Record<string, StaticImageData> = {
  양식: WesternFood,
  중식: ChineseFood,
  한식: KoreanFood,
  일식: JapaneseFood,
};

const Result = ({ answerData }: ResultProps) => {
  const [menu, setMenu] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");

  const fetchAndGenerateLink = async () => {
    try {
      // 추천 결과 받아오기
      const recommendation = await fetchRecommendation(answerData);
      const [menuPart, reasonPart] = recommendation.split(" / ");
      setMenu(menuPart);
      setReason(reasonPart);

      // 공유 링크 생성
      const link = await generateShareLink(recommendation);
      setShareLink(link);
    } catch (error) {
      console.error(error);
      alert("추천 메뉴를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchAndGenerateLink();
  }, [answerData]);

  const selectedImage = foodImages[answerData.answer2] || KoreanFood;

  return menu ? (
    <div
      id="result-container"
      className="flex flex-col items-center bg-white text-black"
    >
      <Image src={selectedImage} alt="recommended-food" className="mt-4" width={355} height={355}/>
      <div className="flex flex-col items-center gap-3">
        <h2 className="mt-8 text-2xl">{menu}</h2>
        <p className="break-normal px-10">{reason}</p>
      </div>
      <Link
        href="/recommend"
        className="mt-6 flex h-12 w-[362px] items-center justify-center rounded bg-primary-500 font-gmarket font-normal text-white"
      >
        추천 다시 받기
      </Link>
      <Link href="/" className="mt-5 font-gmarket text-base text-primary-500">
        메인으로 돌아가기
      </Link>
      <div className="mt-6 flex gap-4 pb-4">
        <SaveResultButton elementId="result-container" />
        <ShareLinkButton link={shareLink} />
      </div>
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <Loading />
    </div>
  );
};

export default Result;

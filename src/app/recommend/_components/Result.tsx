import fetchRecommendation from "@/app/recommend/_actions/fetchRecommendation";
import type { Answer } from "@/app/recommend/_types/answer";
import ChineseFood from "@/assets/images/recommend/chinese-food.png";
import JapaneseFood from "@/assets/images/recommend/japanese-food.png";
import KoreanFood from "@/assets/images/recommend/korean-food.png";
import WesternFood from "@/assets/images/recommend/western-food.png";
import Loading from "@/components/common/Loading";
import SaveResultButton from "@/components/daily/SaveResultButton";
import ShareButton from "@/components/daily/ShareButton";
import { generateShareLink } from "@/lib/utils/daily/shareLink";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ResultProps = {
  answerData?: Answer;
};

const foodImages: Record<string, StaticImageData> = {
  양식: WesternFood,
  중식: ChineseFood,
  한식: KoreanFood,
  일식: JapaneseFood,
};

const Result = ({ answerData }: ResultProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const menuType = searchParams.get("type");
  const [menu, setMenu] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");

  const fetchAndGenerateLink = async () => {
    try {
      // 추천 결과 받아오기
      const recommendation = answerData
        ? await fetchRecommendation(answerData)
        : id
          ? await fetch(`/api/recommend?id=${id}`)
              .then((res) => res.json())
              .then((data) => data.data)
          : null;

      if (!recommendation) throw new Error("추천 데이터를 볼러올 수 없습니다.");

      const [menuPart, reasonPart] = recommendation.split(" / ");
      setMenu(menuPart);
      setReason(reasonPart);

      // 공유 링크 생성
      if (answerData) {
        const link = await generateShareLink(
          recommendation,
          "recommend/result",
          answerData.answer2,
        ); // 추천 결과, 음식 종류 같이 내려주기
        setShareLink(link);
      }
    } catch (error) {
      console.error(error);
      alert("추천 메뉴를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchAndGenerateLink();
  }, [answerData, id]);

  const selectedImage =
    menuType && foodImages[menuType] // URL 파라미터에서 menuType을 사용(공유 페이지)
      ? foodImages[menuType]
      : (answerData?.answer2 && foodImages[answerData.answer2]) || // answerData에 따른 이미지(기본 페이지)
        KoreanFood; // 디폴트 이미지

  const absoluteThumbnailUrl = `${window.location.origin}${selectedImage.src}`;

  return menu ? (
    <div
      id="result-container"
      className="flex flex-col items-center bg-white text-black"
    >
      <Image
        src={selectedImage}
        alt="recommended-food"
        className="mt-20 lg:hidden"
        width={355}
        height={355}
      />
      <Image
        src={selectedImage}
        alt="recommended-food"
        className="mt-10 hidden lg:block"
        width={406}
        height={406}
      />
      <div className="flex flex-col items-center gap-3">
        <h2 className="mt-8 text-2xl lg:mt-4">{menu}</h2>
        <p className="break-normal px-10">{reason}</p>
      </div>

      {id ? (
        // 공유 링크로 접근한 경우
        <Link
          href="/recommend"
          className="mt-6 flex h-12 w-[362px] items-center justify-center rounded bg-primary-500 font-gmarket font-normal text-white"
        >
          나도 하러 가기
        </Link>
      ) : (
        // 결과 페이지에서 접근한 경우
        <>
          <Link
            href="/recommend"
            className="mt-6 flex h-12 w-[362px] items-center justify-center rounded bg-primary-500 font-gmarket font-normal text-white lg:w-[406px]"
          >
            추천 다시 받기
          </Link>
          <Link
            href="/"
            className="mt-5 font-gmarket text-base text-primary-500"
          >
            메인으로 돌아가기
          </Link>
          <div className="mt-6 flex gap-4 pb-4">
            <SaveResultButton elementId="result-container" />
            <ShareButton
              postUrl={shareLink}
              title={menu}
              description={reason}
              thumbnail={absoluteThumbnailUrl}
            />
          </div>
          <span className="mt-4 text-center text-xs text-base-500 lg:hidden">
            아이폰에서는 저장 기능이 원활하게 작동하지 않습니다. <br />
            (세 번 연속 저장하시면, 완성된 이미지가 저장됩니다.)
          </span>
        </>
      )}
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center flex-col gap-4 lg:max-h-[768px]">
      <Loading />
      <p className="text-center">신중하게 메뉴를 결정중입니다. <br/> 잠시만 더 기다려주세요 :)</p>
    </div>
  );
};

export default Result;

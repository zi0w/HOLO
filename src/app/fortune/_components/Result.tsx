"use client";

import fetchDailyFortune from "@/app/recommend/_actions/fetchDailyFortune";
import Fortune from "@/assets/images/fortune/fortune.png";
import Loading from "@/components/common/Loading";
import SaveResultButton from "@/components/daily/SaveResultButton";
import ShareButton from "@/components/daily/ShareButton";
import { generateShareLink } from "@/lib/utils/daily/shareLink";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Result = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [shareLink, setShareLink] = useState<string>("");
  const [fortune, setFortune] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const getDailyFortune = async () => {
    try {
      const result = id
        ? await fetch(`/api/recommend?id=${id}`)
            .then((res) => res.json())
            .then((data) => data.data)
        : await fetchDailyFortune();

      if (!result) throw new Error("운세 데이터를 볼러올 수 없습니다.");

      const [fortunePart, reasonPart] = result.split(" / ");
      setFortune(fortunePart);
      setReason(reasonPart);

      const link = await generateShareLink(result, "fortune/result");
      setShareLink(link);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDailyFortune();
  }, [id]);

  return fortune ? (
    <div
      id="result-container"
      className="block items-center justify-center lg:flex lg:h-screen"
    >
      <div className="lg:w-[512px] mt-4 flex flex-col items-center bg-white text-black lg:mx-auto lg:rounded-3xl lg:border lg:border-primary-500">
        <Image
          src={Fortune}
          alt="result-fortune"
          width={355}
          height={355}
          className="z-10 mt-20 lg:hidden"
        />
        <Image
          src={Fortune}
          alt="result-fortune"
          width={406}
          height={406}
          className="mt-10 hidden lg:block"
        />
        <div className="flex flex-col items-center gap-3">
          <h2 className="mt-8 text-2xl">{fortune}</h2>
          <p className="break-normal px-10">{reason}</p>
        </div>

        {id ? (
          <Link
            href="/fortune"
            className="mb-10 mt-6 flex h-12 w-[362px] items-center justify-center rounded bg-primary-500 font-gmarket font-normal text-white"
          >
            나도 하러 가기
          </Link>
        ) : (
          <>
            <Link
              href="/fortune"
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
                title="포춘쿠키 내용"
                description={fortune}
                thumbnail={Fortune.src}
              />
            </div>
            <span className="mt-4 text-center text-xs text-base-500 lg:hidden">
              아이폰에서는 저장 기능이 원활하게 작동하지 않습니다. <br />
              (세 번 연속 저장하시면, 완성된 이미지가 저장됩니다.)
            </span>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="block items-center justify-center lg:flex lg:h-screen">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 lg:mx-auto lg:max-h-[700px] lg:max-w-lg lg:rounded-3xl lg:border lg:border-primary-500">
        <Loading />
        <p className="text-center">
          포춘쿠키가 열리고 있습니다! <br /> 잠시만 더 기다려주세요 :)
        </p>
      </div>
    </div>
  );
};
export default Result;

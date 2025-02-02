"use client";

import fetchDailyFortune from "@/app/recommend/_actions/fetchDailyFortune";
import ResultFortune from "@/assets/images/fortune/fortune-result.png";
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
  const [fortune, setFortune] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");

  const getDailyFortune = async () => {
    try {
      const result = id
        ? await fetch(`/api/recommend?id=${id}`)
            .then((res) => res.json())
            .then((data) => data.data)
        : await fetchDailyFortune();

      if (!result) throw new Error("운세 데이터를 볼러올 수 없습니다.");
      setFortune(result);

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
      className="flex flex-col items-center bg-white text-black mt-4"
    >
      <Image
        src={ResultFortune}
        alt="result-fortune"
        width={355}
        height={355}
        className="mt-20"
      />
      <div className="flex flex-col items-center gap-3">
        <h2 className="mt-8 text-2xl">포춘쿠키 내용</h2>
        <p className="break-normal px-10">{fortune}</p>
      </div>

      {id ? (
        <Link
          href="/fortune"
          className="mt-6 flex h-12 w-[362px] items-center justify-center rounded bg-primary-500 font-gmarket font-normal text-white"
        >
          나도 하러 가기
        </Link>
      ) : (
        <>
          <Link
            href="/fortune"
            className="mt-6 flex h-12 w-[362px] items-center justify-center rounded bg-primary-500 font-gmarket font-normal text-white"
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
            <ShareButton postUrl={shareLink} title="포춘쿠키 내용" description={fortune} thumbnail={ResultFortune.src} />
          </div>
          <span className="mt-4 text-center text-xs text-base-500">
            아이폰에서는 저장 기능이 원활하게 작동하지 않습니다. <br />
            (세 번 연속 저장하시면, 완성된 이미지가 저장됩니다.)
          </span>
        </>
      )}
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <Loading />
      <p className="text-center">포츈쿠키가 열리고 있습니다! <br/> 잠시만 더 기다려주세요 :)</p>
    </div>
  );
};
export default Result;

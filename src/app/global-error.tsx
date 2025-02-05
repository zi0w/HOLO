"use client";

import ErrorImage from "@/assets/images/common/error_image.png";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center pb-14 lg:pb-0">
      <Image
        src={ErrorImage}
        width={362}
        height={362}
        alt="에러 이미지"
        className=""
      />
      <h2 className="mt-8 text-[52px] text-primary-500">ERROR</h2>
      <h3 className="text-[22px] text-base-800">앗! 에러가 발생했어요</h3>
      <p className="mt-5 text-base-800">죄송합니다.</p>
      <p className="mb-5 text-base-800">잠시 후 다시 시도해주세요.</p>
      <Link
        href="/"
        className="max-h-12 w-full max-w-[362px] rounded border border-primary-500 bg-primary-500 pb-6 pt-3 text-center font-gmarket text-white"
      >
        홈 화면으로 이동하기
      </Link>
    </div>
  );
};

export default Error;

"use client";

import Result from "@/app/recommend/_components/Result";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

const SharedResultPage = () => {
  return (
    <div className="block items-center justify-center lg:flex lg:h-screen">
      <div className="mt-4 w-full px-5 pb-5 lg:mx-auto lg:max-w-xl lg:rounded-3xl lg:border lg:border-primary-500 lg:px-20">
        <Suspense fallback={<Loading />}>
          <Result />
        </Suspense>
      </div>
    </div>
  );
};

export default SharedResultPage;

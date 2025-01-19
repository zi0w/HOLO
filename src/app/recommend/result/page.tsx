"use client";

import Result from "@/app/recommend/_components/Result";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

const SharedResultPage = () => {
  return (
    <div className="bg-white text-black">
      <Suspense fallback={<Loading />}>
        <Result />
      </Suspense>
    </div>
  );
};

export default SharedResultPage;

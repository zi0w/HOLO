"use client";

import SharedResult from "@/app/recommend/_components/SharedResult";
import { Suspense } from "react";

const SharedResultPage = () => {
  return (
    <div className="bg-white text-black">
      <h1>결과 페이지</h1>
      <Suspense fallback={<p>loading...</p>}>
        <SharedResult />
      </Suspense>
    </div>
  );
};

export default SharedResultPage;

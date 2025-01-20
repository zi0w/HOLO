import TrashLayoutBox from "@/app/trash-guide/_components/TrashLayoutBox";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "쓰레기 가이드",
  description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
  openGraph: {
    title: "쓰레기 가이드",
    description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
  },
};

const page = () => {
  return (
    <div className="px-5 pt-11">
      <div className="grid gap-16">
        {/* 쓰레기 배출 요일 확인 */}
        <TrashLayoutBox isWasteDay={true} />
        {/* 음식물 쓰레기 여부 확인 */}
        <TrashLayoutBox isWasteDay={false} />
      </div>
      <div className="mt-10 pb-8 text-center text-xs text-base-600">
        <p>AI를 기반으로 한 답변이므로 확실치 않을 수 있습니다.</p>
        <p>답변이 이상할 경우 다시 시도해 주시기 바랍니다.</p>
      </div>
    </div>
  );
};

export default page;

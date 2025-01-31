import TrashContainer from "@/app/trash-guide/_components/TrashContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "우리동네 쓰레기 정보",
  description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
  openGraph: {
    title: "우리동네 쓰레기 정보",
    description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
    url: `${process.env.NEXT_PUBLIC_API_URL}/trash-guide`,
  },
};

const page = () => {
  return (
    <div className="mx-auto px-5 pt-12 lg:max-w-[550px] lg:px-0">
      <TrashContainer />
      <div className="mt-4 text-center text-xs text-base-600">
        <p>AI를 기반으로 한 답변이므로 확실치 않을 수 있습니다.</p>
        <p>답변이 이상할 경우 다시 시도해 주시기 바랍니다.</p>
      </div>
    </div>
  );
};

export default page;

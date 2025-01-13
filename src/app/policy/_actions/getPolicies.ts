"use server";

import type { PolicyData } from "@/app/policy/_types/policy";

export const getPolicies = async (params: {
  polyRlmCd: string;
  srchPolyBizSecd: string;
}): Promise<PolicyData[]> => {
  const searchParams = new URLSearchParams({
    polyRlmCd: params.polyRlmCd, // 정책 분야 코드
    srchPolyBizSecd: params.srchPolyBizSecd, // 지역 코드
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/policy?${searchParams}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("청년 정책 데이터를 불러오는 중 오류가 발생했습니다.");
  }

  return response.json();
};

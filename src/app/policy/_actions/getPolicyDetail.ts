"use server";

import type { PolicyData } from "@/app/policy/_types/policy";

export const getPolicyDetail = async (id: string): Promise<PolicyData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/policy/${id}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("정책 상세 정보를 불러오는데 실패했습니다.");
  }

  return response.json();
};

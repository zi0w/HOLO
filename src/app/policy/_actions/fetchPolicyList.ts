"use server";

import type { PolicyData } from "@/app/policy/_types/policy";
import { fetchPolicyApi } from "@/app/policy/_utils/policyApi";

export const fetchPolicyList = async ({
  bizTycdSel,
  srchPolyBizSecd,
}: {
  bizTycdSel: string;
  srchPolyBizSecd: string;
}): Promise<PolicyData[]> => {
  try {
    const policyData = await fetchPolicyApi({
      queryParams: { bizTycdSel, srchPolyBizSecd },
    });
    return Array.isArray(policyData) ? policyData : [policyData];
  } catch (error) {
    console.error("정책 API 호출 오류:", error);
    throw new Error("청년 정책 정보를 불러오는 중 오류가 발생했습니다.");
  }
};

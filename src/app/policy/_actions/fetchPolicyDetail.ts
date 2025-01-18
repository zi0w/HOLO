"use server";

import type { PolicyData } from "@/app/policy/_types/policy";
import { fetchPolicyApi } from "@/app/policy/_utils/policyApi";

export const fetchPolicyDetail = async (id: string): Promise<PolicyData> => {
  try {
    const policyDetail = await fetchPolicyApi({
      queryParams: { srchPolicyId: id },
    });
    return policyDetail;
  } catch (error) {
    console.error(error);
    throw new Error("정책 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
};

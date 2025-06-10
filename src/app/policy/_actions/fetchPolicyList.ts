"use server";

import { fetchPolicyApi } from "@/app/policy/_actions/fetchPolicyApi";
import type { PolicyData } from "@/app/policy/_types/policy";

type FetchPolicyListParams = {
  lclsfNm: string;
  zipCd: string;
  pageSize: string;
};

export const fetchPolicyList = async ({
  lclsfNm,
  zipCd,
  pageSize,
}: FetchPolicyListParams): Promise<PolicyData> => {
  try {
    const response = await fetchPolicyApi({
      queryParams: {
        lclsfNm,
        zipCd,
        pageSize,
      },
    });
    const policyData = await response.json();
    return policyData;
  } catch (error) {
    console.error("정책 API 호출 오류:", error);
    throw new Error("청년 정책 정보를 불러오는 중 오류가 발생했습니다.");
  }
};

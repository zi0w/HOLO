"use server";

import xml2js from "xml2js";
import type { PolicyData } from "../_types/policy";

export async function fetchPolicyList({
  polyRlmCd,
  srchPolyBizSecd,
}: {
  polyRlmCd: string;
  srchPolyBizSecd: string;
}): Promise<PolicyData[]> {
  const API_URL = process.env.NEXT_PUBLIC_POLICY_API_URL;
  const SERVICE_KEY = process.env.NEXT_PUBLIC_POLICY_API_KEY;

  if (!API_URL || !SERVICE_KEY) {
    throw new Error("환경 변수가 올바르게 설정되지 않았습니다.");
  }

  const url = `${API_URL}?openApiVlak=${SERVICE_KEY}&display=100&pageIndex=1&bizTycdSel=${polyRlmCd}&srchPolyBizSecd=${srchPolyBizSecd}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("청년 정책 api 주소 오류가 발생했습니다.");
    }

    const xmlData = await res.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const jsonData = await parser.parseStringPromise(xmlData);

    const policyData = jsonData.youthPolicyList.youthPolicy;
    return Array.isArray(policyData) ? policyData : [policyData];
  } catch (error) {
    console.error("정책 API 호출 오류:", error);
    throw new Error("청년 정책 api 불러오던중 오류가 발생했습니다.");
  }
}

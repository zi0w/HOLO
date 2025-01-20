"use server";

import xml2js from "xml2js";

type FetchPolicyParams = {
  queryParams: Record<string, string>;
};

export const fetchPolicyApi = async ({ queryParams }: FetchPolicyParams) => {
  const API_URL = process.env.NEXT_PUBLIC_POLICY_API_URL;
  const SERVICE_KEY = process.env.NEXT_PUBLIC_POLICY_API_KEY;

  if (!API_URL || !SERVICE_KEY) {
    throw new Error("환경 변수가 올바르게 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    openApiVlak: SERVICE_KEY,
    display: "100",
    pageIndex: "1",
    ...queryParams,
  });

  const url = `${API_URL}?${params.toString()}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("청년 정책 API 호출 중 오류가 발생했습니다.");
  }

  const xmlData = await res.text();
  const parser = new xml2js.Parser({ explicitArray: false });
  const jsonData = await parser.parseStringPromise(xmlData);

  return jsonData.youthPolicyList.youthPolicy;
};

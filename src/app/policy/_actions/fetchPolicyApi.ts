"use server";

type FetchPolicyParams = {
  queryParams: Record<string, string>;
};

export const fetchPolicyApi = async ({ queryParams }: FetchPolicyParams) => {
  const API_URL = process.env.NEXT_PUBLIC_POLICY_API_URL;
  const SERVICE_KEY = process.env.POLICY_API_KEY;

  if (!API_URL || !SERVICE_KEY) {
    throw new Error("api url 혹은 service key가 올바르게 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    apiKeyNm: SERVICE_KEY,
    rtnType: "json",
    ...queryParams,
  });

  const url = `${API_URL}?${params.toString()}`;

  const res = await fetch(url, {
    next: {
      revalidate: 604800, // 1주일마다
    },
  });

  if (!res.ok) {
    throw new Error("청년 정책 API 호출 중 오류가 발생했습니다.");
  }

  return res;
};

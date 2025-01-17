import xml2js from "xml2js";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const API_URL = process.env.NEXT_PUBLIC_POLICY_API_URL;
  const SERVICE_KEY = process.env.NEXT_PUBLIC_POLICY_API_KEY;

  const url = `${API_URL}?openApiVlak=${SERVICE_KEY}&display=10&pageIndex=1&srchPolicyId=${params.id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("청년 정책 상세 정보를 불러오는데 실패했습니다.");
    }

    const xmlData = await res.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const jsonData = await parser.parseStringPromise(xmlData);
    const policyDetail = jsonData.youthPolicyList.youthPolicy;

    return new Response(JSON.stringify(policyDetail), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "정책 상세 정보를 불러오는 중 오류가 발생했습니다.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

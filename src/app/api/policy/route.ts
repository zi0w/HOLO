import xml2js from "xml2js";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const polyRlmCd = searchParams.get("polyRlmCd"); // 정책 분야
  const srchPolyBizSecd = searchParams.get("srchPolyBizSecd"); // 지역

  const API_URL = process.env.NEXT_PUBLIC_POLICY_API_URL;
  const SERVICE_KEY = process.env.NEXT_PUBLIC_POLICY_API_KEY;

  const url = `${API_URL}?openApiVlak=${SERVICE_KEY}&display=100&pageIndex=1&bizTycdSel=${polyRlmCd}&srchPolyBizSecd=${srchPolyBizSecd}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("청년 정책 api 주소 오류가 발생했습니다.");
    }

    const xmlData = await res.text();

    const parser = new xml2js.Parser({ explicitArray: false });
    const jsonData = await parser.parseStringPromise(xmlData);

    return new Response(JSON.stringify(jsonData.youthPolicyList.youthPolicy), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "청년 정책 api 불러오던중 오류가 발생했습니다.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

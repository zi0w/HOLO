import { database } from "@/app/recommend/_utils/database";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { data } = body;

    if (!data || typeof data !== "string") {
      return NextResponse.json(
        { error: "유효하지 않은 데이터입니다." },
        { status: 400 },
      );
    }

    const id = uuidv4();
    database.set(id, data); // TODO: database라는 말이 모호?
    return NextResponse.json({ id });
  } catch (error) {
    console.error("POST 요청에 실패했습니다.", error)
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !database.has(id)) {
    return NextResponse.json(
      { error: "데이터를 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  const data = database.get(id);
  return NextResponse.json({ data });
};

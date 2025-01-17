// pages/api/check-nickname.ts
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 가져오기
import type { NextApiRequest, NextApiResponse } from "next"; // Next.js API 타입 가져오기

const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nickname } = req.body;

    // 닉네임 중복 검사
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .single();

    if (error) {
      return res.status(500).json({ error: "서버 오류" });
    }

    // 닉네임이 존재하지 않으면 사용 가능
    const isAvailable = !data;
    return res.status(200).json({ isAvailable });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

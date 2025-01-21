
import { createClient } from "@/lib/utils/supabase/client"; 
import type { NextApiRequest, NextApiResponse } from "next"; 

const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nickname } = req.body;

    
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .single();

    if (error) {
      return res.status(500).json({ error: "서버 오류" });
    }

    
    const isAvailable = !data;
    return res.status(200).json({ isAvailable });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

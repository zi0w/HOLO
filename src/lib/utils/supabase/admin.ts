// lib/utils/supabase/client.ts
import type { Database } from "@/lib/types/supabase"; // Database 타입 임포트
import { createServerClient } from "@supabase/ssr"; // Supabase SSR 클라이언트 임포트
import { cookies } from "next/headers";

export const createClient = async (useAdmin: boolean = false) => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    useAdmin
      ? process.env.SUPABASE_SERVICE_ROLE_KEY!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
};


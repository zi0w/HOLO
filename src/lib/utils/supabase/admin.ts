
import type { Database } from "@/lib/types/supabase"; 
import { createServerClient } from "@supabase/ssr"; 
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


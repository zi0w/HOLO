// // lib/utils/supabase/server.ts
// import type { Database } from "@/lib/types/supabase"; // Database 타입 임포트
// import { createServerClient } from "@supabase/ssr"; // Supabase SSR 클라이언트 임포트

// export const createAdminClient = () => {
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!, 
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Supabase URL과 Anon Key로 클라이언트 생성
//   );
// };

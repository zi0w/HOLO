import type { Database } from "@/lib/types/supabase";


export type DatabaseUser = Database['public']['Tables']['users']['Row'];

export type AuthUser = {
  id: string;
  email?: string;
}

export type User = DatabaseUser & AuthUser;

export type SignInPayload = {
  email: string;
  password: string;
}

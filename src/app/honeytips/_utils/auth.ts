import type { User } from "@/app/honeytips/_types/honeytips.type";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const getId = async (): Promise<User["id"] | null> => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return null;
  }

  return userData.user.id;
};

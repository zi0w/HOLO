"use client";
import { createClient } from "@/lib/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
    };
    fetchUser();
  }, []);
  return isAuthenticated;
};

export default useAuth;

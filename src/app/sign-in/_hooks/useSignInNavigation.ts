"use client";
import { useRouter } from "next/navigation";
import { useGuestStore } from "@/hooks/useGuestAccess";

export const useSignInNavigation = () => {
  const router = useRouter();
  const setGuest = useGuestStore((state) => state.setGuest);

  const handleGoToSignUp = () => {
    router.push("/sign-up");
  };

  const handleGuestAccess = () => {
    setGuest(true);
    router.push("/");
  };

  return {
    handleGoToSignUp,
    handleGuestAccess,
  };
};
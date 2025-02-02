"use client";

import ProfileEditIcon from "@/assets/images/mypage/profileedit.svg";
import Loading from "@/components/common/Loading";
import type { Tables } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");

  
  const { data: userData, isLoading } = useQuery<
    Tables<"users">,
    Error,
    Tables<"users">
  >({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID is required");

      const { data, error } = await supabase
        .from("users")
        .select("nickname, profile_image_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data as Tables<"users">;
    },
    enabled: !!user?.id,
    gcTime: 1000 * 60 * 30,
    staleTime: 0,
  });

  
  const updateProfileMutation = useMutation({
    mutationFn: async (updateData: Partial<Tables<"users">>) => {
      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user!.id);

      if (error) throw error;
    },
    onMutate: async (updateData) => {
      await queryClient.cancelQueries({ queryKey: ["userInfo", user?.id] });
      const previousUserData = queryClient.getQueryData(["userInfo", user?.id]);

    
      queryClient.setQueryData(
        ["userInfo", user?.id],
        (old: Tables<"users">) => ({
          ...old,
          ...updateData,
        }),
      );

      return { previousUserData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["userInfo", user?.id],
        context?.previousUserData,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
    },
  });

  
  useEffect(() => {
    if (userData) {
      setLocalImageUrl(userData.profile_image_url || null);
      setNickname(userData.nickname);
    }
  }, [userData]);

  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  
  const handleNicknameUpdate = () => {
    if (nickname !== userData.nickname) {
      updateProfileMutation.mutate({ nickname });
    }
  };

  
  const handleProfileImageUpdate = (newImageUrl: string) => {
    updateProfileMutation.mutate({ profile_image_url: newImageUrl });
  };
  return (
    <div className="w-full bg-white pt-16">
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center px-5 pt-[5px] lg:px-0 lg:pl-[calc(50vw-400px)]">
          <button className="flex items-center">
            <h1 className="font-gmarket pt-16 text-2xl font-medium leading-8 text-base-800">
              마이페이지
            </h1>
          </button>
        </div>
  
        <div className="relative mt-12 h-32 w-32">
          <Image
            src={localImageUrl || defaultImageUrl}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImageUrl;
              handleProfileImageUpdate(defaultImageUrl);
            }}
          />
          <button
            onClick={() => router.push("/mypage/edit")}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full"
            aria-label="프로필 수정"
          >
            <ProfileEditIcon className="transition-transform hover:scale-110" />
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <div
            onBlur={handleNicknameUpdate}
            className=" flex h-8 items-center justify-center border-b border-gray-300 text-lg font-medium text-base-800 focus:outline-none"
          />
          {userData.nickname || ""}
        </div>
      </div>
    </div>
  );
  
};

export default UserProfile;





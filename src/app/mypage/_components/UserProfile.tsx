"use client";

import type { ProfileUpdateData } from "@/app/mypage/_types/myPage";
import profileEditIcon from "@/assets/images/mypage/profileedit.png";
import Loading from "@/components/common/Loading";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);

  const { data: userData, isLoading } = useQuery<ProfileUpdateData>({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID is required");

      const { data, error } = await supabase
        .from("users")
        .select("nickname, profile_image_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data as ProfileUpdateData;
    },
    enabled: !!user?.id,
    gcTime: 1000 * 60 * 30,
    staleTime: 0,
  });

  useEffect(() => {
    if (userData) {
      setLocalImageUrl(userData.profile_image_url || null);
    }
  }, [userData]);

  useEffect(() => {
    if (user?.id) {
      queryClient.prefetchQuery({
        queryKey: ["userInfo", user.id],
        queryFn: async () => {
          const { data, error } = await supabase
            .from("users")
            .select("nickname, profile_image_url")
            .eq("id", user.id)
            .single();
          if (error) throw error;
          return data as ProfileUpdateData;
        },
      });
    }
  }, [user?.id, queryClient, supabase]);

  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" w-full bg-base-50 pt-16">
      <div className="flex flex-col">
        <div className="flex w-full items-center px-5 pt-[5px]">
          <button className="flex items-center" onClick={() => router.back()}>
            <h1 className="self-stretch font-['Noto_Sans_KR'] text-base font-bold leading-[150%] text-base-800">
              마이페이지
            </h1>
          </button>
        </div>

        <div className="mt-[5px] flex flex-col items-center">
          <div className="relative h-[100px] w-[100px]">
            <Image
              width={100}
              height={100}
              src={localImageUrl || defaultImageUrl}
              alt="프로필 이미지"
              className="h-full w-full rounded-full object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImageUrl;
              }}
            />
          </div>
          <div className="mt-[8px] flex items-center">
            <input
              type="text"
              value={userData.nickname || ""}
              readOnly
              className={`font-pretendard text-[18px] font-medium text-base-800`}
            />
            <button
              onClick={() => router.push("/mypage/edit")}
              className="ml-2 flex items-center justify-center"
              aria-label="프로필 수정"
            >
              <Image
                src={profileEditIcon}
                alt="프로필 수정"
                width={32}
                height={32}
                className="transition-transform hover:scale-110"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


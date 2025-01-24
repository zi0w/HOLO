"use client";

import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import type { User } from "@/app/mypage/_types/myPage";
import useAuthStore from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import profileEditIcon from "@/assets/images/mypage/profileedit.png";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

  const { data: userData, isLoading } = useQuery<User>({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID is required");
      
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data as User;
    },
    enabled: !!user?.id,
    gcTime: 1000 * 60 * 30,
    staleTime: 0,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
    }
    setIsModalOpen(false);
  };

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center"></div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col">
        {/* 헤더 */}
        <div className="flex w-full items-center px-5 pt-[5px]">
          <div className="relative flex items-center">
            <button className="flex items-center" onClick={() => router.back()}>
              <h1 className="font-pretendard whitespace-nowrap text-[24px] font-bold">
                마이페이지
              </h1>
            </button>
          </div>
        </div>

        {/* 프로필 */}
        <div className="mt-[5px] flex flex-col items-center">
          <div className="relative">
            <button className="relative h-[100px] w-[100px]">
              <Image
                width={100}
                height={100}
                src={userData.profile_image_url || "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg"}
                alt="프로필 이미지"
                className="h-full w-full rounded-full object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";
                }}
              />
            </button>
            <button
              onClick={handleOpenModal}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
              aria-label="프로필 수정"
            >
              <Image
                src={profileEditIcon}
                alt="프로필 수정"
                width={32}
                height={32}
              />
            </button>
          </div>
          <div className="mt-[8px] flex items-center">
            <span className="font-pretendard text-[18px] font-medium text-[#424242]">
              {userData.nickname || "마이스토링"}
            </span>
          </div>
        </div>

        <ProfileEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialData={userData}
        />
      </div>
    </div>
  );
};

export default UserProfile;





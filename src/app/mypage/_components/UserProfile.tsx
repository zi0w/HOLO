"use client";

import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";

import type { User } from "@/app/mypage/_types/mypPage";
import useAuthStore from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const updateUserInfo = useUpdateUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousData, setPreviousData] = useState<User | null>(null);

  // 유저 정보 쿼리
  const { data: userData, isLoading } = useQuery<User>({
    queryKey: ["userInfo", user?.id],
    queryFn: () => user as User,
    initialData: user as User,
    enabled: !!user,
    gcTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 5,
  });

  // 모달 관련 핸들러
  const handleOpenModal = () => {
    if (userData) {
      setPreviousData(userData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    try {
      const currentData = queryClient.getQueryData<User>([
        "userInfo",
        user?.id,
      ]);
      if (currentData) {
        setPreviousData(currentData);
      }
      await updateUserInfo();
      await queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      setPreviousData(null);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      if (user?.id && previousData) {
        queryClient.setQueryData(["userInfo", user.id], previousData);
      }
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">로딩중...</div>
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
          <button className="relative h-[100px] w-[100px]">
            <Image
              width={100}
              height={100}
              src={
                userData.profile_image_url ??
                "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg"
              }
              alt="프로필 이미지"
              className="h-full w-full rounded-full object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://tjxonwrcuvvfxkfkgadc.supabase.co/storage/v1/object/public/profile_image/profile_default_img.jpg";
              }}
            />
          </button>
          <div className="mt-[8px] flex items-center">
            <span className="font-pretendard text-[18px] font-medium text-[#424242]">
              {userData.nickname || "마이스토링"}
            </span>
            <button
              onClick={handleOpenModal}
              className="ml-2 text-base"
              aria-label="프로필 수정"
            >
              ✏️
            </button>
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

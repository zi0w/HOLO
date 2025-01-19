// components/UserProfile.tsx
"use client";

import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";
import type { User } from "@/app/mypage/_types/mypage";
import useAuthStore from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

// previousData 타입은 User 타입과 동일
type PreviousData = User;

const UserProfile = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const updateUserInfo = useUpdateUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousData, setPreviousData] = useState<PreviousData | null>(null);

  const { data: userData } = useQuery<User>({
    queryKey: ["userInfo", user?.id],
    queryFn: () => user as User,
    initialData: user as User,
    enabled: !!user,
    gcTime: 1000 * 60 * 30, // 캐시 유지 시간
    staleTime: 1000 * 60 * 5, // 데이터가 오래된 것으로 간주되기까지의 시간
  });

  const handleOpenModal = () => {
    // 모달을 열 때 현재 데이터를 백업
    if (userData) {
      setPreviousData(userData);
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = async () => {
    setIsModalOpen(false);
    try {
      // 실제 데이터 업데이트 전에 현재 상태 백업
      const currentData = queryClient.getQueryData<User>(["userInfo", user?.id]);
      if (currentData) {
        setPreviousData(currentData);
      }

      // 실제 데이터 업데이트
      await updateUserInfo();

      // 성공 시 캐시 무효화 및 리페치
      await queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      
      // 성공 후 백업 데이터 초기화
      setPreviousData(null);
    } catch (error) {
      // 에러 발생 시 이전 상태로 롤백
      console.error("프로필 업데이트 실패:", error);
      if (user?.id && previousData) {
        queryClient.setQueryData(["userInfo", user.id], previousData);
      }
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  // 사용자 데이터가 없거나 필수 필드가 없는 경우 처리
  if (!userData) {
    return <div>로그인이 필요합니다.</div>;
  }

  const profileImageUrl =
    userData.profile_image_url || "https://tjxonwrcuvvfxkfkgadc.supabase.co/storage/v1/object/public/profile_image/profile_default_img.jpg";

  return (
    <>
      <button className="absolute left-[141px] top-[178px] h-[120px] w-[120px]">
        <Image
          width={200}
          height={200}
          src={profileImageUrl}
          alt="프로필 이미지"
          className="h-full w-full rounded-full object-cover"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://tjxonwrcuvvfxkfkgadc.supabase.co/storage/v1/object/public/profile_image/profile_default_img.jpg";
          }}
        />
      </button>
      <div className="flex items-center">
        <h1 className="absolute left-[166px] top-[310px] h-[24px] w-[70px] font-['Pretendard'] text-base font-bold leading-6 text-left text-[#424242] underline-offset-[from-font]">
          {userData.nickname}
        </h1>
        <button 
          onClick={handleOpenModal}
          className="absolute left-[240px] top-[310px]"
          aria-label="프로필 수정"
        >
          ✏️
        </button>
      </div>
      <ProfileEditModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        initialData={userData}
      />
    </>
  );
};

export default UserProfile;
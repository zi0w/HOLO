"use client";

import { PasswordChangeModal } from "@/app/mypage/_components/PasswordChangeModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";

import Loading from "@/components/common/Loading";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "@/app/mypage/_components/ProfileModal"; 
import ImageEditIcon from "@/app/mypage/_components/ImageEditIcon";

const ImageNicknameForm = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // ProfileModal 상태 추가
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const supabase = createClient();
  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    nickname,
    isNicknameValid,
    nicknameError,
    handleNicknameChange,
    checkNicknameDuplicate,
  } = useUpdateUserInfo(user?.id || "");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID is required");

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    gcTime: 1000 * 60 * 30,
    staleTime: 0,
  });

  useEffect(() => {
    if (userData) {
      handleNicknameChange(userData.nickname || "");
      setPreviewUrl(userData.profile_image_url || defaultImageUrl);
    }
  }, [userData, handleNicknameChange]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCancel = () => {
    router.push("/mypage");
  };

  const handleSave = async () => {
    if (!user?.id || !userData) return;
    if (!isNicknameValid || !(await checkNicknameDuplicate(nickname))) return;

    try {
      const updates: { nickname?: string; profile_image_url?: string } = {};

      if (nickname !== userData.nickname) {
        updates.nickname = nickname;
        const updateResult = await supabase
          .from("users")
          .update({ nickname })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      if (profileImage) {
        const fileExt = profileImage.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const uploadResult = await supabase.storage
          .from("profile_image")
          .upload(fileName, profileImage);

        if (uploadResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile_image").getPublicUrl(fileName);

        const updateResult = await supabase
          .from("users")
          .update({ profile_image_url: publicUrl })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      await queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
      setIsProfileModalOpen(true); // 프로필 업데이트 성공 시 모달 열기
    } catch {
      alert("프로필 업데이트에 실패했습니다");
    }
  };

  const handlePasswordEditOpen = () => {
    setIsModalOpen(true);
  };

  const handlePasswordEditClose = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
    }
    setIsModalOpen(false);
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    router.push("/mypage"); 
  };

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="relative h-[874px] w-[402px] bg-white px-5">
        
          <h1 className="pt-[60px] font-gmarket text-[24px] font-medium leading-[32px] text-base-800">
            프로필 수정
          </h1>
          <div className="relative mx-auto mt-8 h-[120px] w-[120px]">
            <Image
              src={previewUrl||defaultImageUrl}
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover"
              priority
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full"
              onClick={handleImageButtonClick}
            >
 <ImageEditIcon 
  width={32} 
  height={32} 
  className="transition-transform hover:scale-110" 
/>
            </button>
          </div>
          <div className="mt-12 space-y-4">
            <div className="space-y-2">
              <label className="font-gmarket text-[14px] font-normal leading-[20px] text-base-800">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
                className={`h-[56px] w-full rounded-[4px] border px-4 text-[14px] text-base-800 ${
                  nicknameError ? "border-primary-500" : "border-base-500"
                }`}
              />
              {nicknameError && (
                <p className="mt-1 text-sm text-primary-500">{nicknameError}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-gmarket text-[14px] font-normal leading-[20px] text-base-800">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="●●●●●●●●●●●●"
                  className="h-[56px] w-full rounded-[4px] border border-base-500 px-4 text-[14px] text-base-500"
                  readOnly
                />
                <button
                  className="absolute right-4 top-1/2 flex h-[28px] w-[37px] -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border border-base-500 text-[14px] font-medium text-base-800"
                  onClick={handlePasswordEditOpen}
                >
                  수정
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-14 left-5 right-5 space-y-4">
            <button
              className="h-[48px] w-full rounded-[4px] border border-base-800 text-[16px] font-medium text-base-800"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className="h-[48px] w-full rounded-[4px] bg-primary-500 text-[16px] font-medium text-base-50"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <PasswordChangeModal
            isOpen={isModalOpen}
            onClose={handlePasswordEditClose}
          />
        </div>
      )}
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          message="프로필 업데이트가 완료되었습니다."
          onClose={handleProfileModalClose} // 마이페이지로 이동
        />
      )}
    </>
  );
};

export default ImageNicknameForm;






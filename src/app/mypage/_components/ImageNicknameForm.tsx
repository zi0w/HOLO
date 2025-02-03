"use client";

import { PasswordChangeModal } from "@/app/mypage/_components/PasswordChangeModal";
import ProfileModal from "@/app/mypage/_components/ProfileModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";
import ImageEditIcon from "@/assets/images/mypage/imageedit.svg";
import Loading from "@/components/common/Loading";
import useAuthStore from "@/store/useAuthStore";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfileChange } from "../_hooks/useProfileChangeHooks";

const ImageNicknameForm = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  const {
    nickname,
    isNicknameValid,
    nicknameError,
    handleNicknameChange,
    checkNicknameDuplicate,
  } = useUpdateUserInfo(user?.id || "");

  const {
    userData,
    isLoading,
    isModalOpen,
    isProfileModalOpen,
    previewUrl,
    fileInputRef,
    handleImageChange,
    handleSave,
    handlePasswordEditOpen,
    handlePasswordEditClose,
    handleImageButtonClick,
    handleProfileModalClose,
  } = useProfileChange();

  const handleCancel = () => {
    router.push("/mypage");
  };

  const handleSaveClick = async () => {
    if (!isNicknameValid || !(await checkNicknameDuplicate(nickname))) return;
    handleSave(nickname);
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
        <div className="relative h-[872px] w-[400px] bg-white px-5">
          <h1 className="pt-16 font-gmarket text-2xl font-medium leading-8 text-base-800">
            프로필 수정
          </h1>
          <div className="relative mx-auto mt-8 h-[120px] w-[120px]">
            <Image
              src={previewUrl || defaultImageUrl}
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
              <label className="font-gmarket text-sm font-normal leading-5 text-base-800">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
                className={clsx(
                  `h-14 w-full rounded border px-4 text-sm text-base-800 ${
                    nicknameError ? "border-primary-500" : "border-base-500"
                  }`,
                )}
              />
              {nicknameError && (
                <p className="mt-1 text-sm text-primary-500">{nicknameError}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-gmarket text-sm font-normal leading-5 text-base-800">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="●●●●●●●●●●●●"
                  className="h-14 w-full rounded border border-base-500 px-4 text-sm text-base-500"
                  readOnly
                />
                <button
                  className="absolute right-4 top-1/2 flex h-7 w-9 -translate-y-1/2 items-center justify-center gap-2 rounded border border-base-500 text-sm font-medium text-base-800"
                  onClick={handlePasswordEditOpen}
                >
                  수정
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-14 left-5 right-5 space-y-4">
            <button
              className="h-12 w-full rounded border border-base-400 text-base font-medium text-base-800"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className="h-12 w-full rounded bg-primary-500 text-base font-medium text-base-50"
              onClick={handleSaveClick}
            >
              저장
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
          onClose={() => {
            handleProfileModalClose();
            router.push("/mypage");
          }}
        />
      )}
    </>
  );
};

export default ImageNicknameForm;

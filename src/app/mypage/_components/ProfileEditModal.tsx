"use client";

import { UseProfileEdit } from "@/app/mypage/_hooks/useMyProfileEdit";
import type { User } from "@/app/mypage/_types/myPage";
import type { ProfileEditModalProps } from "@/app/mypage/_types/profile";
import ProfileForm from "./ProfileForm";
import ProfileImageUploader from "./ProfileImageUploader";
import ProfileModal from "./ProfileModal";
import { useState } from "react";

type ExtendedProfileEditModalProps = ProfileEditModalProps & {
  initialData: User;
};

const ProfileEditModal = ({
  isOpen,
  onClose,
  initialData,
}: ExtendedProfileEditModalProps) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    nickname,
    previewUrl,
    password,
    confirmPassword,
    passwordError,
    nicknameError,
    handleNicknameChange,
    handleImageChange,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = UseProfileEdit(onClose, initialData, (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  });

  if (!isOpen) return null;

  const defaultImageUrl = "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 rounded-lg bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">프로필 수정</h2>
          <form onSubmit={handleSubmit}>
            <ProfileImageUploader
              previewUrl={previewUrl || initialData.profile_image_url || defaultImageUrl}
              onImageChange={handleImageChange}
            />
            <ProfileForm
              nickname={nickname}
              password={password}
              confirmPassword={confirmPassword}
              nicknameError={nicknameError}
              passwordError={passwordError}
              onNicknameChange={handleNicknameChange}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-gray-200 px-4 py-2"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white"
                disabled={!!nicknameError} 
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>

      <ProfileModal
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};

export default ProfileEditModal;





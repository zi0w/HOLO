// components/ProfileEditModal.tsx
"use client";

import { UseProfileEdit } from "@/app/mypage/_hooks/useMyProfileEdit";
import type { User } from "@/app/mypage/_types/myPage";
import type { ProfileEditModalProps } from "@/app/mypage/_types/profile";
import ProfileForm from "./ProfileForm";
import ProfileImageUploader from "./ProfileImageUploader";

// interface ExtendedProfileEditModalProps extends ProfileEditModalProps {
//   initialData: User;
// }
type ExtendedProfileEditModalProps = ProfileEditModalProps & {
  initialData: User;
};
const ProfileEditModal = ({
  isOpen,
  onClose,
  initialData,
}: ExtendedProfileEditModalProps) => {
  const {
    nickname,
    previewUrl,
    password,
    confirmPassword,
    passwordError,
    nicknameError,
    isCheckingNickname,
    handleNicknameChange,
    handleImageChange,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = UseProfileEdit(onClose, initialData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">프로필 수정</h2>
        <form onSubmit={handleSubmit}>
          <ProfileImageUploader
            previewUrl={previewUrl}
            onImageChange={handleImageChange}
          />
          <ProfileForm
            nickname={nickname}
            password={password}
            confirmPassword={confirmPassword}
            nicknameError={nicknameError}
            passwordError={passwordError}
            isCheckingNickname={isCheckingNickname}
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
              disabled={isCheckingNickname || !!nicknameError}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;

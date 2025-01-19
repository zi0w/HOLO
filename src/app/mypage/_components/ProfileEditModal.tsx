// components/ProfileEditModal.tsx
"use client";

import type { ProfileEditModalProps } from "@/app/mypage/_types/profile";
import type { User } from "@/app/mypage/_types/mypage";
import ProfileImageUploader from "./ProfileImageUploader";
import ProfileForm from "./ProfileForm";
import { useProfileEdit } from "@/app/mypage/_hooks/useProfileEdit";

interface ExtendedProfileEditModalProps extends ProfileEditModalProps {
  initialData: User;
}

const ProfileEditModal: React.FC<ExtendedProfileEditModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
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
    handleSubmit
  } = useProfileEdit(onClose, initialData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
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
              className="px-4 py-2 bg-gray-200 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
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
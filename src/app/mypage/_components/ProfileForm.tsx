// components/ProfileForm.tsx
import type { ProfileFormProps } from '@/app/mypage/_types/User';
import React from 'react';


const ProfileForm = ({
  nickname,
  password,
  confirmPassword,
  nicknameError,
  passwordError,
  isCheckingNickname,
  onNicknameChange,
  onPasswordChange,
  onConfirmPasswordChange
}:ProfileFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-2">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={onNicknameChange}
          className={`border p-2 w-full ${nicknameError ? 'border-red-500' : ''}`}
          placeholder="2-10자 사이로 입력해주세요"
        />
        {isCheckingNickname && (
          <p className="text-gray-500 text-sm mt-1">닉네임 중복 확인 중...</p>
        )}
        {nicknameError && (
          <p className="text-red-500 text-sm mt-1">{nicknameError}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">새 비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          className="border p-2 w-full"
          placeholder="변경하지 않으려면 비워두세요"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">새 비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          className="border p-2 w-full"
          placeholder="비밀번호를 다시 입력하세요"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>
    </>
  );
};

export default ProfileForm;
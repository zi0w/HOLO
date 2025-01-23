import type { ProfileFormProps } from '@/app/mypage/_types/user';
import React from 'react';

const ProfileForm = ({
  nickname,
  password,
  confirmPassword,
  nicknameError,
  passwordError,
  onNicknameChange,
  onPasswordChange,
  onConfirmPasswordChange
}: Omit<ProfileFormProps, 'isCheckingNickname'>) => {
  return (
    <>
      <div className="mb-4 h-[90px]">
        <label className="block mb-2">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={onNicknameChange}
          className={`border p-2 w-full ${nicknameError ? 'border-red-500' : ''}`}
          placeholder="2-10자 사이로 입력해주세요"
        />
        <div className="h-[24px]">
          {nicknameError && (
            <p className="text-red-500 text-sm mt-1">{nicknameError}</p>
          )}
        </div>
      </div>

      <div className="mb-4 h-[80px]">
        <label className="block mb-2">새 비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          className="border p-2 w-full"
          placeholder="변경하지 않으려면 비워두세요"
        />
      </div>

      <div className="mb-4 h-[90px]">
        <label className="block mb-2">새 비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          className="border p-2 w-full"
          placeholder="비밀번호를 다시 입력하세요"
        />
        <div className="h-[24px]">
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;



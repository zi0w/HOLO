"use client";

import ProfileModal from "@/app/mypage/_components/ProfileModal";
import CancelIcon from "@/assets/images/mypage/cancel.svg";
// import { useRouter } from "next/navigation";
import { usePasswordChange } from "../_hooks/usePasswordChangeHooks";

type PasswordChangeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isProfileModalOpen,
    setIsProfileModalOpen,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSave,
  } = usePasswordChange();

  // const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-800 bg-opacity-30">
        <div className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded bg-white">
          <div className="px-5 py-10">
            <button
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <CancelIcon
                width={24}
                height={24}
                className="transition-transform hover:scale-110"
              />
            </button>
            <h1 className="mb-8 font-gmarket-bold text-2xl leading-8 text-base-800">
              비밀번호 수정
            </h1>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block font-gmarket text-sm leading-5 text-base-800"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="8~16자의 영문, 숫자, 특수문자 조합"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full rounded border border-base-500 px-3 py-4 font-gmarket text-sm placeholder:leading-5 placeholder:text-base-500"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-primary-500">
                    {passwordError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-1 block font-gmarket text-sm leading-5 text-base-800"
                >
                  비밀번호 확인
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="비밀번호 재입력"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full rounded border border-base-500 px-3 py-4 font-gmarket text-sm placeholder:leading-5 placeholder:text-base-500"
                />
                {confirmPasswordError && (
                  <p className="mt-1 text-sm text-primary-500">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full border-t border-base-500">
            <button
              className="bg-base-0 flex-1 rounded-bl-md py-3 text-center text-base-800"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex-1 rounded-br bg-primary-500 py-3 font-gmarket text-base leading-5 text-base-50"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </div>
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          message="비밀번호 변경이 완료되었습니다."
          onClose={() => {
            setIsProfileModalOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

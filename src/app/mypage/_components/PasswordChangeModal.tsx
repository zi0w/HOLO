"use client";

import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import ProfileModal from "@/app/mypage/_components/ProfileModal"; 
import CancelIcon from "@/assets/images/mypage/cancel.svg";
import { useRouter } from "next/navigation";

type PasswordChangeModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // ProfileModal 상태 추가
  const supabase = createClient();
  const router = useRouter();

  const validatePasswords = () => {
    let isValid = true;

    if (password.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSave = async () => {
    if (!validatePasswords()) return;

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setPasswordError("비밀번호 변경에 실패했습니다.");
        return;
      }

      setIsProfileModalOpen(true); // 비밀번호 변경 성공 시 모달 열기
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      setPasswordError("비밀번호 변경에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-800 bg-opacity-30">
        <div className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white">
          <div className="px-5 py-10">
            <button
              className="absolute right-4 top-4" // 오른쪽 모서리 끝에 위치하도록 수정
              onClick={() => router.push("/mypage")}
            >
              <CancelIcon 
  width={24} 
  height={24} 
  className="transition-transform hover:scale-110" 
/>
            </button>
            <h1 className="mb-8 font-gmarket-bold text-[24px] leading-[32px] text-base-800">
              비밀번호 수정
            </h1>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block font-gmarket text-[14px] leading-[20px] text-base-800"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full rounded-[4px] border border-base-500 px-[12px] py-4 font-gmarket text-sm placeholder:leading-[20px] placeholder:text-base-500"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-primary-500">{passwordError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-1 block font-gmarket text-[14px] leading-[20px] text-base-800"
                >
                  비밀번호 확인
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full rounded-[4px] border border-base-500 px-[12px] py-4 font-gmarket text-sm placeholder:leading-[20px] placeholder:text-base-500"
                />
                {confirmPasswordError && (
                  <p className="mt-1 text-sm text-primary-500">{confirmPasswordError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full border-t border-base-800">
            <button
              className="flex-1 rounded-bl-md bg-base-0 py-3 text-center text-base-800"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex-1 rounded-br-[4px] bg-[#FF7600] py-3 font-gmarket text-[16px] leading-[20px] text-base-50"
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
            onClose(); // 기존 onClose 호출하여 모달 닫기
          }}
        />
      )}
    </>
  );
};






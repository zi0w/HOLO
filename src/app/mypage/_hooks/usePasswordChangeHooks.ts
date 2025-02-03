
import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

export const usePasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const supabase = createClient();

  const validatePasswords = () => {
    let isValid = true;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError("8~16자의 영문, 숫자, 특수문자를 조합해서 입력해주세요.");
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
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

    if (newPassword.length < 8 || newPassword.length > 16) {
      setPasswordError("8~16자로 입력해주세요.");
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError("영문, 숫자, 특수문자를 조합해서 입력해주세요.");
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

      setIsProfileModalOpen(true);
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      setPasswordError("비밀번호 변경에 실패했습니다.");
    }
  };

  return {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isProfileModalOpen,
    setIsProfileModalOpen,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSave
  };
};
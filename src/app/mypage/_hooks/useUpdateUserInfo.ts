import { createClient } from "@/lib/utils/supabase/client";
import { useState, useCallback } from "react";

export const useUpdateUserInfo = (userId: string) => {
  const supabase = createClient();
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [nicknameError, setNicknameError] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");

  
  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value.trim()) {
      setIsEmailValid(false);
      setEmailError("이메일을 입력해주세요.");
      return false;
    }
    if (!emailRegex.test(value)) {
      setIsEmailValid(false);
      setEmailError("이메일 주소가 정확한지 확인해주세요.");
      return false;
    }
    setIsEmailValid(true);
    setEmailError("");
    return true;
  };

  
  const validateNickname = (value: string) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9._-]{2,20}$/;
    if (!value.trim()) {
      setIsNicknameValid(false);
      setNicknameError("닉네임을 입력해주세요.");
      return false;
    }
    if (!nicknameRegex.test(value)) {
      setIsNicknameValid(false);
      setNicknameError("2~20자의 한글, 영문, 숫자, 특수문자(._-)만 사용 가능합니다.");
      return false;
    }
    setIsNicknameValid(true);
    setNicknameError("");
    return true;
  };

  const handleEmailChange = useCallback(
    (newEmail: string) => {
      setEmail(newEmail);
      validateEmail(newEmail);
    },
    []
  );

  const handleNicknameChange = useCallback(
    (newNickname: string) => {
      setNickname(newNickname);
      validateNickname(newNickname);
    },
    []
  );

  const checkEmailDuplicate = useCallback(
    async (newEmail: string) => {
      if (!validateEmail(newEmail)) {
        return false;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("email")
          .eq("email", newEmail)
          .neq("id", userId);

        if (error) {
          console.error("이메일 중복 확인 에러:", error);
          return false;
        }

        if (data && data.length > 0) {
          setEmailError("이미 사용 중인 이메일입니다.");
          return false;
        }

        setEmailError("");
        return true;
      } catch (error) {
        console.error("이메일 중복 확인 실패:", error);
        return false;
      }
    },
    [userId, supabase]
  );

  const checkNicknameDuplicate = useCallback(
    async (newNickname: string) => {
      if (!validateNickname(newNickname)) {
        return false;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("nickname")
          .eq("nickname", newNickname)
          .neq("id", userId);

        if (error) {
          console.error("닉네임 중복 확인 에러:", error);
          return false;
        }

        if (data && data.length > 0) {
          setNicknameError("이미 사용 중인 닉네임입니다.");
          return false;
        }

        setNicknameError("");
        return true;
      } catch (error) {
        console.error("닉네임 중복 확인 실패:", error);
        return false;
      }
    },
    [userId, supabase]
  );

  return {
    email,
    isEmailValid,
    emailError,
    nickname,
    setNickname,
    isNicknameValid,
    nicknameError,
    handleEmailChange,
    handleNicknameChange,
    checkEmailDuplicate,
    checkNicknameDuplicate,
  };
};





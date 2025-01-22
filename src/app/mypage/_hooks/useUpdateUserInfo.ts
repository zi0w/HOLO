import { createClient } from "@/lib/utils/supabase/client";
import { useState, useCallback } from "react";

export const useUpdateUserInfo = (userId: string) => {
  const supabase = createClient();
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [nicknameError, setNicknameError] = useState("");
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  // 실시간 유효성 검사
  const validateNickname = (value: string) => {
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (!value.trim()) {
      setIsNicknameValid(false);
      setNicknameError("닉네임을 입력해주세요.");
      return false;
    }
    if (!nicknameRegex.test(value)) {
      setIsNicknameValid(false);
      setNicknameError("닉네임은 2~10자의 한글, 영문, 숫자만 사용 가능합니다.");
      return false;
    }
    setIsNicknameValid(true);
    setNicknameError("");
    return true;
  };

  const handleNicknameChange = useCallback(
    (newNickname: string) => {
      setNickname(newNickname);
      setIsDuplicateChecked(false);
      validateNickname(newNickname);
    },
    []
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
          .neq("id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          return true;
        }

        if (data) {
          setIsDuplicateChecked(true);
          setNicknameError("이미 사용 중인 닉네임입니다.");
          return false;
        }

        setIsDuplicateChecked(true);
        setNicknameError("");
        return true;
      } catch (error) {
        console.error("닉네임 중복 확인 실패:", error);
        return true;
      }
    },
    [userId, supabase]
  );

  return {
    nickname,
    isNicknameValid,
    nicknameError,
    isDuplicateChecked,
    handleNicknameChange,
    checkNicknameDuplicate,
  };
};




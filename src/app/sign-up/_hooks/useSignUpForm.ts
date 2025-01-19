// hooks/useSignUpForm.ts
import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

export type FormData = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  profile_img_url: string;
};

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
    profile_img_url: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const supabase = createClient();

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from("users")
      .select("nickname")
      .eq("nickname", nickname)
      .single();

    if (error && error.code !== "PGRST116") {
      return false;
    }
    return !data;
  };

  const validate = async (name: string, value: string): Promise<string> => {
    switch (name) {
      case "email":
        const isValidEmail = /^[^\s@]+@[^\s@]+\.(com|net)$/.test(value);
        if (!isValidEmail) return "유효한 이메일을 입력해주세요.";
        break;
      case "nickname":
        if (!value.trim()) return "닉네임을 입력해주세요.";
        if (value.length > 10) return "닉네임은 최대 10자 이하여야 합니다.";
        const isAvailable = await checkNicknameDuplicate(value);
        if (!isAvailable) return "이미 사용 중인 닉네임입니다.";
        break;
      case "password":
        if (value.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
        break;
      case "checkPassword":
        if (value !== formData.password) return "비밀번호가 일치하지 않습니다.";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = await validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateAll = async (): Promise<Record<string, string>> => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      const error = await validate(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    }
    setErrors(newErrors);
    return newErrors;
  };

  return {
    formData,
    errors,
    handleChange,
    validateAll,
  };
};
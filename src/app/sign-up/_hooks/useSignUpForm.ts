// app/sign-up/_hooks/useSignUpForm.ts
"use client";

import { useState } from "react";

export type FormData = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
};

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, value: string): string => {
    switch (name) {
      case "email":
        const isValidEmail = /^[^\s@]+@[^\s@]+\.(com|net)$/.test(value);
        if (!isValidEmail) return "유효한 이메일을 입력해주세요.";
        break;
      case "nickname":
        if (!value.trim()) return "닉네임을 입력해주세요.";
        if (value.length > 10) return "닉네임은 최대 10자 이하여야 합니다.";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateAll = async () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return newErrors;
  };

  return { formData, errors, handleChange, validateAll };
};

export default useSignUpForm;
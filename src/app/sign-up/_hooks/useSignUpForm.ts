// src/app/sign-up/_hooks/UseSignUpForm.ts
"use client";

import type { SignUpFormData } from "@/app/sign-up/_types/SignupType";
import { useState } from "react";

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
    profile_image_url: "", // 빈 문자열로 초기화
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // value 매개변수의 타입을 string | undefined로 변경
  const validate = (name: string, value: string | undefined): string => {
    if (!value) {
      if (name === 'profile_image_url') return ""; // profile_image_url은 선택사항
      return "필수 입력 항목입니다.";
    }

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
      if (key !== 'profile_image_url') {
        const error = validate(key, formData[key as keyof SignUpFormData]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return newErrors;
  };

  return { formData, errors, handleChange, validateAll };
};


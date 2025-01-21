// hooks/useSignInForm.ts
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
}

type FormErrors = {
  [key: string]: string;
}

export const useSignInForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "유효한 이메일을 입력해주세요.";
        }
        break;
      case "password":
        if (value.length < 8) {
          return "비밀번호는 최소 8자 이상이어야 합니다.";
        }
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

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    validateAll,
  };
};
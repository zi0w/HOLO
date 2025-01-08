"use client";
import { signUp, type SignUpData } from "@/app/sign-up/_utils/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type FormData = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  profile_img_url: string;
};

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
    profile_img_url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    const signUpData: SignUpData = {
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password,
      profile_image_url: formData.profile_img_url,
    };

    try {
      await signUp(signUpData);

      alert("회원가입 성공");
      router.push("sign-in");
    } catch (error) {
      alert(error);
    }
  };

  // 로그인 페이지로 이동하는 함수
  const handleGoToLogin = () => {
    router.push("/sign-in"); // 로그인 페이지 경로로 이동
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 w-[400px] rounded-lg border border-[#aaa] p-6 shadow-md"
    >
      <label className="my-[20px] block text-[16px] text-sm font-medium text-white">
        이메일
      </label>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none"
        required
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
      )}

      <label className="mb-2 mt-4 block text-sm font-medium text-white">
        닉네임
      </label>

      <input
        type="text"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none"
        required
      />
      {errors.nickname && (
        <p className="mt-1 text-sm text-red-500">{errors.nickname}</p>
      )}

      <label className="mb-2 mt-4 block text-sm font-medium text-white">
        비밀번호
      </label>

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none"
        required
      />
      {errors.password && (
        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
      )}

      <label className="mb-2 mt-4 block text-sm font-medium text-white">
        비밀번호 확인
      </label>

      <input
        type="password"
        name="checkPassword"
        value={formData.checkPassword}
        onChange={handleChange}
        className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none"
        required
      />
      {errors.checkPassword && (
        <p className="mt-1 text-sm text-red-500">{errors.checkPassword}</p>
      )}

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        disabled={Object.values(errors).some((error) => error)}
      >
        회원가입
      </button>

      {/* 로그인 버튼 */}
      <button
        type="button" // 기본 버튼으로 설정하여 폼 제출 방지
        onClick={handleGoToLogin}
        className="mt-4 w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        로그인
      </button>
    </form>
  );
};

export default SignUpForm;

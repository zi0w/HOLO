"use client";

import useSignInMutation from "@/app/sign-in/_hooks/useSignInMutation";
import { useState } from "react";

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate } = useSignInMutation(); // mutate 함수 가져오기

  // 유효성 검사 함수
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
      default:
        break;
    }
    return "";
  };

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // 로그인 요청 핸들러
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 필드 유효성 검사
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    // 로그인 요청
    mutate(formData); // 로그인 요청
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-[400px] rounded-lg border border-[#aaa] p-6 shadow-md"
    >
      <label className="mb-[20px] block text-[16px] text-sm font-medium text-white">
        이메일
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-md bg-gray-800 px-3 py-2 text-white focus:outline-none"
        required
        placeholder="이메일을 입력해주세요."
      />
      {errors.email && (
        <p className="mt-[10px] text-[16px] text-red-500">{errors.email}</p>
      )}

      <label className="my-[20px] block text-[16px] text-sm font-medium text-white">
        비밀번호
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full rounded-md bg-gray-800 px-3 py-2 text-white focus:outline-none"
        required
        placeholder="비밀번호를 입력해주세요."
      />
      {errors.password && (
        <p className="mt-[10px] text-[16px] text-red-500">{errors.password}</p>
      )}

      <button
        type="submit"
        className={`mt-6 mt-[30px] w-full rounded-md px-4 py-2 ${
          Object.values(errors).some((error) => error)
            ? "cursor-not-allowed bg-gray-500 text-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={Object.values(errors).some((error) => error)} // 유효성 검사 오류가 있을 때 비활성화
      >
        로그인
      </button>
    </form>
  );
};

export default SignInForm;

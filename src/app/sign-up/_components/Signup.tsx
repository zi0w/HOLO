// components/SignUpForm.tsx
"use client";

import { useSignUpSubmit } from "@/app/sign-up/_hooks/seSignUpSubmit";
import { useSignUpForm } from "@/app/sign-up/_hooks/useSignUpForm";


const SignUpForm: React.FC = () => {
  const { formData, errors, handleChange, validateAll } = useSignUpForm();
  const { handleSubmit, handleGoToLogin } = useSignUpSubmit();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = await validateAll();
    handleSubmit(formData, newErrors);
  };

  return (
    <form
      onSubmit={onSubmit}
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

      <button
        type="button"
        onClick={handleGoToLogin}
        className="mt-4 w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        로그인
      </button>
    </form>
  );
};

export default SignUpForm;


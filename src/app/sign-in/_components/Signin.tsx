// components/SignInForm.tsx
"use client";

import SocialLogin from "@/app/sign-in/_components/SocialLogin";
import { useSignInForm } from "@/app/sign-in/_hooks/useSignInForm";
import useSignInMutation from "@/app/sign-in/_hooks/useSignInMutation";
import { useSignInNavigation } from "@/app/sign-in/_hooks/useSignInNavigation";

const SignInForm: React.FC = () => {
  const { formData, errors, handleChange, validateAll } = useSignInForm();
  const { handleGoToSignUp, handleGuestAccess } = useSignInNavigation();
  const { mutate } = useSignInMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    mutate(formData);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[400px] rounded-lg border border-[#aaa] p-6 shadow-md">
        <form onSubmit={handleLogin}>
          <div>
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
          </div>

          <div>
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
              <p className="mt-[10px] text-[16px] text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`h-[48px] w-[362px] rounded-[4px] px-4 py-2 ${
              Object.values(errors).some((error) => error)
                ? "cursor-not-allowed bg-gray-500 text-gray-300"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
            disabled={Object.values(errors).some((error) => error)}
          >
            로그인
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center space-y-4">
          <span className="text-white">또는</span>
          <div className="flex justify-center space-x-4">
            <div className="h-[48px] w-[48px]">
              <SocialLogin />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoToSignUp}
          className="mt-4 flex h-[48px] w-[402px] items-center justify-center rounded-full border-2 border-orange-500 bg-transparent text-white hover:bg-orange-500/10"
        >
          회원가입
        </button>

        <button
          type="button"
          onClick={handleGuestAccess}
          className="mt-4 flex h-[48px] w-[402px] items-center justify-center rounded-full border-2 border-gray-500 bg-transparent text-gray-300 hover:bg-gray-500/10"
        >
          비회원으로 둘러보기
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
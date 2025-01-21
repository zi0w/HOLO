// components/SignInForm.tsx
"use client";

import SocialLogin from "@/app/sign-in/_components/SocialLogin";
import { useSignInForm } from "@/app/sign-in/_hooks/useSignInForm";
import useSignInMutation from "@/app/sign-in/_hooks/useSignInMutation";
import { useSignInNavigation } from "@/app/sign-in/_hooks/useSignInNavigation";

const SignInForm = () => {
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
    <div className="flex w-[362px] flex-col items-center">
      <form onSubmit={handleLogin} className="w-full">
        <div className="w-full">
          <div className="space-y-[8px]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요."
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] bg-[#F8F9FA] px-4 text-[14px] placeholder:text-[#999] valid:bg-[#F8F9FA] focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호(영문+숫자 6-16자)"
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] bg-[#F8F9FA] px-4 text-[14px] placeholder:text-[#999] valid:bg-[#F8F9FA] focus:outline-none"
              required
            />
            {errors.password && (
              <p className="text-[12px] text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`mt-[24px] h-[56px] w-full rounded-[4px] text-[16px] font-medium text-white ${
              Object.values(errors).some((error) => error)
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#FF7600] hover:bg-[#E66A00]"
            }`}
            disabled={Object.values(errors).some((error) => error)}
          >
            로그인
          </button>
        </div>
      </form>

      <div className="my-[32px] flex w-full justify-center">
        <SocialLogin />
      </div>

      <div className="w-full space-y-[12px]">
        <button
          type="button"
          onClick={handleGoToSignUp}
          className="h-[56px] w-full rounded-[4px] border border-[#FF7600] text-[16px] font-medium text-[#FF7600] hover:bg-[#FF7600]/5"
        >
          회원가입
        </button>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGuestAccess}
            className="text-[14px] font-normal text-[#666] hover:text-[#444]"
          >
            비회원으로 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

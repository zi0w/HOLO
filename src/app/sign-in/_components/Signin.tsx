"use client";

import SigninModal from "@/app/sign-in/_components/SigninModal";
import SocialLogin from "@/app/sign-in/_components/SocialLogin";
import { useSignInForm } from "@/app/sign-in/_hooks/useSignInForm";
import useSignInMutation from "@/app/sign-in/_hooks/useSignInMutation";
import { useSignInNavigation } from "@/app/sign-in/_hooks/useSignInNavigation";
import clsx from "clsx";

const SignInForm = () => {
  const { formData, errors, handleChange, validateAll } = useSignInForm();
  const { handleGoToSignUp, handleGuestAccess } = useSignInNavigation();
  const { mutate, modalState, closeModal } = useSignInMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    mutate(formData);
  };

  return (
    <>
      <div className="mx-5 mt-6 flex flex-col items-center pb-5">
        <form onSubmit={handleLogin} className="w-full">
          <div className="w-full">
            <div className="space-y-2">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력해주세요."
                  className="h-14 w-[360px] rounded border border-base-500 bg-base-50 px-4 text-sm placeholder:text-base-500 valid:bg-base-50 focus:outline-none"
                  required
                />
                {errors.email && (
                  <p className="text-xs text-primary-500">{errors.email}</p>
                )}
              </div>
  
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호(영문+숫자 6-16자)"
                  className="h-14 w-[360px] rounded border border-base-500 bg-base-50 px-4 text-sm placeholder:text-base-500 valid:bg-base-50 focus:outline-none"
                  required
                />
                {errors.password && (
                  <p className="text-xs text-primary-500">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
  
            <button
              type="submit"
              className={clsx(`mt-8 h-12 w-[360px] rounded text-base font-medium text-base-50 ${
                Object.values(errors).some((error) => error)
                  ? "cursor-not-allowed bg-base-400"
                  : "bg-primary-500 hover:bg-primary-600"
              }`)}
              disabled={Object.values(errors).some((error) => error)}
            >
              로그인
            </button>
          </div>
        </form>
  
        <div className="my-10 flex w-full justify-center">
          <SocialLogin />
        </div>
  
        <div className="w-full">
          <button
            type="button"
            onClick={handleGoToSignUp}
            className="h-12 w-[360px] rounded border border-primary-500 text-base font-medium text-primary-500 hover:bg-primary-500/5"
          >
            회원가입
          </button>
  
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleGuestAccess}
              className="text-sm font-normal text-base-700"
            >
              비회원으로 둘러보기
            </button>
          </div>
        </div>
      </div>
  
      <SigninModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        onClose={closeModal}
      />
    </>
  );
  
};

export default SignInForm;







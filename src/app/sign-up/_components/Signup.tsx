"use client";

import { useSignUpForm } from "@/app/sign-up/_hooks/useSignUpForm";
import { useSignUpMutation } from "@/app/sign-up/_hooks/useSignUpMutation";
import { useRouter } from "next/navigation";
import type { SignUpPayload } from "../_types/signupType";
import SignUpModal from "./SignUpModal";

const SignUp = () => {
  const { formData, errors, handleChange, validateAll } = useSignUpForm();
  const { mutate, modalState, closeModal } = useSignUpMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = await validateAll();

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.nickname === "이미 사용 중인 닉네임입니다.") {
        alert(
          "중복된 닉네임으로는 회원가입이 불가능합니다. 다른 닉네임을 사용해주세요.",
        );
        return;
      }
      alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    const signUpData: SignUpPayload = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      ...(formData.profile_image_url &&
        formData.profile_image_url.trim() !== "" && {
          profile_image_url: formData.profile_image_url,
        }),
    };

    mutate(signUpData);
  };

  const handleGoToLogin = () => {
    router.push("/sign-in");
  };

  return (
    <>
      <div className="mx-5 mt-6 flex flex-col items-center pb-5">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <div className="space-y-[8px]">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력해주세요."
                  className="h-[56px] w-[362px] rounded-[4px] border border-base-400 bg-base-50 px-4 text-[14px] placeholder:text-base-500 focus:outline-none"
                  required
                />
                {errors.email && (
                  <p className="text-[12px] text-primary-500">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="닉네임을 입력해주세요."
                  className="h-[56px] w-[362px] rounded-[4px] border border-base-400 bg-base-50 px-4 text-[14px] placeholder:text-base-500 focus:outline-none"
                  required
                />
                {errors.nickname && (
                  <p className="text-[12px] text-primary-500">
                    {errors.nickname}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호(영문+숫자 6-16자)"
                  className="h-[56px] w-[362px] rounded-[4px] border border-base-400 bg-base-50 px-4 text-[14px] placeholder:text-base-500 focus:outline-none"
                  required
                />
                {errors.password && (
                  <p className="text-[12px] text-primary-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="checkPassword"
                  value={formData.checkPassword}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                  className="h-[56px] w-[362px] rounded-[4px] border border-base-400 bg-base-50 px-4 text-[14px] placeholder:text-base-500 focus:outline-none"
                  required
                />
                {errors.checkPassword && (
                  <p className="text-[12px] text-primary-500">
                    {errors.checkPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`mt-6 h-[48px] w-[362px] rounded-[4px] text-[16px] font-medium text-base-50 ${
                Object.values(errors).some((error) => error)
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-primary-500 hover:bg-primary-600"
              }`}
              disabled={Object.values(errors).some((error) => error)}
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="mt-[16px] w-full">
          <button
            type="button"
            onClick={handleGoToLogin}
            className="h-[48px] w-[362px] rounded-[4px] border border-primary-500 text-[16px] font-medium text-primary-500 hover:bg-primary-500/5"
          >
            로그인
          </button>
        </div>
      </div>

      <SignUpModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        onClose={closeModal}
      />
    </>
  );
};

export default SignUp;

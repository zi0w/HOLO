"use client";

import { useSignUpMutation } from "@/app/sign-up/_hooks/useSignUpMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignUpSchemaType, signUpSchema } from "../_types/signupSchema";
import type { SignUpPayload } from "../_types/signupType";
import SignUpModal from "./SignUpModal";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { mutate, modalState, closeModal } = useSignUpMutation();
  const router = useRouter();

  const onSubmit = async (data: SignUpSchemaType) => {
    const signUpData: SignUpPayload = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      ...(data.profile_image_url &&
        data.profile_image_url.trim() !== "" && {
          profile_image_url: data.profile_image_url,
        }),
    };

    mutate(signUpData);
  };

  const handleModalClose = () => {
    closeModal();
    if (modalState.message === "회원가입이 완료되었습니다.") {
      router.push("/sign-in");
    }
  };

  const handleGoToLogin = () => {
    router.push("/sign-in");
  };

  return (
    <>
      <div className="mx-5 mt-6 flex flex-col items-center pb-5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full">
            <div className="space-y-2">
              <div>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="h-14 w-[360px] rounded border border-base-400 bg-base-50 px-4 text-sm placeholder:text-base-500 focus:outline-none"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-primary-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="2~20자의 한글, 영문, 숫자, 특수문자(._-)"
                  className="h-14 w-[360px] rounded border border-base-400 bg-base-50 px-4 text-sm placeholder:text-base-500 focus:outline-none"
                  {...register("nickname")}
                />
                {errors.nickname && (
                  <p className="text-xs text-primary-500">
                    {errors.nickname.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="8~16자의 영문, 숫자, 특수문자 조합"
                  className="h-14 w-[360px] rounded border border-base-400 bg-base-50 px-4 text-sm placeholder:text-base-500 focus:outline-none"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-primary-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="비밀번호 재입력"
                  className="h-14 w-[360px] rounded border border-base-400 bg-base-50 px-4 text-sm placeholder:text-base-500 focus:outline-none"
                  {...register("checkPassword")}
                />
                {errors.checkPassword && (
                  <p className="text-xs text-primary-500">
                    {errors.checkPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={clsx(
                `mt-6 h-12 w-[362px] rounded text-base font-medium text-base-50`,
                Object.keys(errors).length > 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-primary-500 hover:bg-primary-600",
              )}
              disabled={Object.keys(errors).length > 0}
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="mt-4 w-full">
          <button
            type="button"
            onClick={handleGoToLogin}
            className="h-12 w-[362px] rounded border border-primary-500 text-base font-medium text-primary-500 hover:bg-primary-500/5"
          >
            로그인
          </button>
        </div>
      </div>

      <SignUpModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        onClose={handleModalClose}
      />
    </>
  );
};

export default SignUp;



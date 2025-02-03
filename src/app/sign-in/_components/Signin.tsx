"use client";

import SigninModal from "@/app/sign-in/_components/SigninModal";
import SocialLogin from "@/app/sign-in/_components/SocialLogin";
import useSignInMutation from "@/app/sign-in/_hooks/useSignInMutation";
import { useSignInNavigation } from "@/app/sign-in/_hooks/useSignInNavigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchemaType, signInSchema } from "../_types/signInSchema";
import clsx from "clsx";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const { handleGoToSignUp, handleGuestAccess } = useSignInNavigation();
  const { mutate, modalState, closeModal } = useSignInMutation();

  const onSubmit = (data: SignInSchemaType) => {
    mutate(data);
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
                  placeholder="아이디(이메일)"
                  className="h-14 w-[360px] rounded border border-base-500 bg-base-50 px-4 text-sm placeholder:text-base-500 valid:bg-base-50 focus:outline-none"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-primary-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="비밀번호(8~16자의 영문, 숫자, 특수문자)"
                  className="h-14 w-[360px] rounded border border-base-500 bg-base-50 px-4 text-sm placeholder:text-base-500 valid:bg-base-50 focus:outline-none"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-primary-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={clsx(
                `mt-8 h-12 w-[360px] rounded text-base font-medium text-base-50`,
                Object.keys(errors).length > 0
                  ? "cursor-not-allowed bg-base-400"
                  : "bg-primary-500 hover:bg-primary-600"
              )}
              disabled={Object.keys(errors).length > 0}
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





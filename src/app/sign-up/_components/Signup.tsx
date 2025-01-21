
"use client";

import { useSignUpForm } from "@/app/sign-up/_hooks/UseSignUpForm";
import { useSignUpMutation } from "@/app/sign-up/_hooks/UseSignUpMutation";

import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { formData, errors, handleChange, validateAll } = useSignUpForm();
  const { mutate } = useSignUpMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = await validateAll();

    if (Object.keys(newErrors).length > 0) {
      alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    mutate(formData);
  };

  const handleGoToLogin = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex w-[362px] flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full">
          <div className="space-y-[8px]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요."
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] bg-[#F8F9FA] px-4 text-[14px] placeholder:text-[#999] focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email}</p>
            )}

            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] bg-[#F8F9FA] px-4 text-[14px] placeholder:text-[#999] focus:outline-none"
              required
            />
            {errors.nickname && (
              <p className="text-[12px] text-red-500">{errors.nickname}</p>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호(영문+숫자 6-16자)"
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] bg-[#F8F9FA] px-4 text-[14px] placeholder:text-[#999] focus:outline-none"
              required
            />
            {errors.password && (
              <p className="text-[12px] text-red-500">{errors.password}</p>
            )}

            <input
              type="password"
              name="checkPassword"
              value={formData.checkPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] bg-[#F8F9FA] px-4 text-[14px] placeholder:text-[#999] focus:outline-none"
              required
            />
            {errors.checkPassword && (
              <p className="text-[12px] text-red-500">{errors.checkPassword}</p>
            )}
          </div>
          
          <button
            type="submit"
            className={`mt-[16px] h-[56px] w-full rounded-[4px] text-[16px] font-medium text-white ${
              Object.values(errors).some((error) => error)
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#FF7600] hover:bg-[#E66A00]"
            }`}
            disabled={Object.values(errors).some((error) => error)}
          >
            회원가입
          </button>
        </div>
      </form>
      
      <div className="w-full mt-[16px]"> {/* mt-[12px]에서 mt-[16px]로 변경 */}
        <button
          type="button"
          onClick={handleGoToLogin}
          className="h-[56px] w-full rounded-[4px] border border-[#FF7600] text-[16px] font-medium text-[#FF7600] hover:bg-[#FF7600]/5"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
// hooks/useSignUpSubmit.ts
import { signUp, type SignUpData } from "@/app/sign-up/_utils/auth";
import { useRouter } from "next/navigation";
import type { FormData } from "./useSignUpForm";

export const useSignUpSubmit = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData, errors: Record<string, string>) => {
    if (Object.keys(errors).length > 0) {
      if (errors.nickname === "이미 사용 중인 닉네임입니다.") {
        alert("중복된 닉네임으로는 회원가입이 불가능합니다. 다른 닉네임을 사용해주세요.");
        return;
      }
      alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
      return;
    }

    const signUpData: SignUpData = {
      email: formData.email,
      nickname: formData.nickname,
      profile_image_url: formData.profile_img_url,
      password: formData.password,
    };

    try {
      await signUp(signUpData);
      alert("회원가입 성공");
      router.push("sign-in");
    } catch (error) {
      alert(error);
    }
  };

  const handleGoToLogin = () => {
    router.push("/sign-in");
  };

  return {
    handleSubmit,
    handleGoToLogin,
  };
};
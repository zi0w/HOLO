import { z } from "zod";

export const signUpSchema = z.object({
  
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 주소가 정확한지 확인해주세요.")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "이메일 주소가 정확한지 확인해주세요."
    ),

  
  nickname: z
    .string()
    .min(2, "2자 이상 입력해주세요.")
    .max(20, "20자 이하로 입력해주세요.")
    .regex(
      /^[가-힣a-zA-Z0-9._-]+$/,
      "한글, 영문, 숫자, 특수문자(._-)만 사용 가능합니다."
    ),

  
  password: z
    .string()
    .min(8, "8자 이상 입력해주세요.")
    .max(16, "16자 이하로 입력해주세요.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
      "영문, 숫자, 특수문자를 조합해서 입력해주세요."
    ),

 
  checkPassword: z
    .string()
    .min(1, "비밀번호를 한번 더 입력해주세요."),

 
  profile_image_url: z
    .string()
    .optional(),
}).refine((data) => data.password === data.checkPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["checkPassword"],
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;


import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 주소를 다시 확인해주세요.")
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "이메일 주소를 다시 확인해주세요."
    ),
  
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요.")
    .min(8, "8~16자의 영문, 숫자, 특수문자를 사용하세요.")
    .max(16, "8~16자의 영문, 숫자, 특수문자를 사용하세요.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
      "8~16자의 영문, 숫자, 특수문자를 사용하세요."
    ),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

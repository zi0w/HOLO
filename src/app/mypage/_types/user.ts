export type UpdateUserData = {
  nickname?: string;
  email?: string;
  profile_image_url?: string | null;
}; 

export type ProfileFormProps = {
  nickname: string;
  password: string;
  confirmPassword: string;
  nicknameError: string;
  passwordError: string;
  isCheckingNickname: boolean;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
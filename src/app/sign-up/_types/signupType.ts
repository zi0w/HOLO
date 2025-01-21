
export type SignUpFormData = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  profile_image_url?: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  nickname: string;
  profile_image_url?: string;  
};
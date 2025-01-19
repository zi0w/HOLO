// app/mypage/_types/profile.ts
export type UserData ={
    id: string;
    nickname: string;
    profile_image_url: string | null;
    email: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export type ProfileEditModalProps = {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export type ProfileFormData = {
    nickname: string;
    password: string;
    confirmPassword: string;
    profileImage: File | null;
  }
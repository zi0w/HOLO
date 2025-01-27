import type { User } from "@/app/mypage/_types/myPage";
import type { UserData } from "@/app/mypage/_types/profile";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const UseProfileEdit = (
  onClose: () => void, 
  initialData: User,
  showSuccessMessage: (message: string) => void
) => {
  const [nickname, setNickname] = useState(initialData.nickname || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.profile_image_url || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const user = useAuthStore((state) => state.user);
  const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    setNickname(initialData.nickname || "");
    setPreviewUrl(initialData.profile_image_url || "");
  }, [initialData]);

  const validateNickname = (value: string) => {
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (!value.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      return false;
    }
    if (!nicknameRegex.test(value)) {
      setNicknameError("닉네임은 2~10자의 한글, 영문, 숫자만 사용 가능합니다.");
      return false;
    }
    setNicknameError("");
    return true;
  };

  const checkNicknameDuplicate = async (newNickname: string) => {
    if (newNickname === user?.nickname) {
      setNicknameError("");
      return true;
    }

    if (!validateNickname(newNickname)) {
      return false;
    }

    setIsCheckingNickname(true);
    try {
      const encodedNickname = encodeURIComponent(newNickname);
      const { data, error } = await supabase
        .from("users")
        .select("nickname")
        .eq("nickname", encodedNickname)
        .neq("id", user?.id || "")
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("닉네임 중복 확인 에러:", error);
        setNicknameError("닉네임 확인에 실패했습니다.");
        return false;
      }

      if (data) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        return false;
      }

      setNicknameError("");
      return true;
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      setNicknameError("닉네임 확인에 실패했습니다.");
      return false;
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    validateNickname(newNickname);
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showSuccessMessage("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validatePasswords = () => {
    if (password && password.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    }
    if (password && password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    if (password && !validatePasswords()) return;

    const isNicknameValid = await checkNicknameDuplicate(nickname);
    if (!isNicknameValid) {
      return;
    }

    const previousData = queryClient.getQueryData<UserData>(["userInfo", user.id]);

    try {
      const updates: { nickname?: string; profile_image_url?: string } = {};

      // 닉네임 변경
      if (nickname !== user.nickname) {
        updates.nickname = nickname;
        const updateResult = await supabase
          .from("users")
          .update({ nickname })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      // 프로필 이미지 변경
      if (profileImage) {
        const fileExt = profileImage.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const uploadResult = await supabase.storage
          .from("profile_image")
          .upload(fileName, profileImage);

        if (uploadResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile_image").getPublicUrl(fileName);
        
        const updateResult = await supabase
          .from("users")
          .update({ profile_image_url: publicUrl })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      // 비밀번호 변경
      if (password) {
        const passwordResult = await supabase.auth.updateUser({
          password: password,
        });

        if (passwordResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
      showSuccessMessage("프로필 업데이트에 성공했습니다");
      
    } catch {
      if (previousData) {
        queryClient.setQueryData(["userInfo", user.id], previousData);
      }
      showSuccessMessage("프로필 업데이트에 실패했습니다");
    }
  };

  return {
    nickname,
    profileImage,
    previewUrl,
    password,
    confirmPassword,
    passwordError,
    nicknameError,
    isCheckingNickname,
    handleNicknameChange,
    handleImageChange,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  };
};

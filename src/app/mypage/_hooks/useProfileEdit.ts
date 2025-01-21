// app/mypage/_hooks/useProfileEdit.ts
import type { User } from "@/app/mypage/_types/Mypage";
import type { UserData } from "@/app/mypage/_types/Profile";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useProfileEdit = (onClose: () => void, initialData: User) => {
  const [nickname, setNickname] = useState(initialData.nickname || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    initialData.profile_image_url || "",
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const supabase = createClient();
  const queryClient = useQueryClient();

  useEffect(() => {
    setNickname(initialData.nickname || "");
    setPreviewUrl(initialData.profile_image_url || "");
  }, [initialData]);

  const checkNicknameDuplicate = async (newNickname: string) => {
    if (newNickname === user?.nickname) {
      setNicknameError("");
      return false;
    }

    setIsCheckingNickname(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("nickname")
        .eq("nickname", newNickname)
        .neq("id", user?.id || "")
        .single();

      if (error && error.code === "PGRST116") {
        setNicknameError("");
        return false;
      } else if (data) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        return true;
      }
      return false;
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류:", error);
      setNicknameError("닉네임 중복 확인에 실패했습니다.");
      return true;
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    if (newNickname.length > 10) {
      setNicknameError("닉네임은 10자 이하여야 합니다.");
      return;
    }

    const timeoutId = setTimeout(() => {
      checkNicknameDuplicate(newNickname);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validatePasswords = () => {
    if (password && password.length < 6) {
      setPasswordError("비밀번호는 최소 6자 이상이어야 합니다.");
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
    if (nicknameError) {
      alert("닉네임을 확인해주세요.");
      return;
    }

    let previousData: UserData | undefined;

    try {
      const updates: { nickname?: string; profile_image_url?: string } = {}; // 알맞은 데이터 넣어주기

      previousData = queryClient.getQueryData<UserData>(["userInfo", user.id]);

      if (previousData) {
        queryClient.setQueryData<UserData>(["userInfo", user.id], {
          ...previousData,
          nickname:
            nickname !== user.nickname ? nickname : previousData.nickname,
          profile_image_url: profileImage
            ? URL.createObjectURL(profileImage)
            : previousData.profile_image_url,
        });
      }

      if (nickname !== user.nickname) {
        updates.nickname = nickname;
      }

      if (profileImage) {
        const fileExt = profileImage.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("profile_image")
          .upload(fileName, profileImage);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile_image").getPublicUrl(fileName);
        console.log(publicUrl);
        updates.profile_image_url = publicUrl;
      }

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from("users")
          .update(updates)
          .eq("id", user.id);

        if (updateError) throw updateError;
      }

      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password,
        });

        if (passwordError) throw passwordError;
      }

      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });

      onClose();
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      if (previousData) {
        queryClient.setQueryData(["userInfo", user.id], previousData);
      }

      console.error("프로필 업데이트 중 오류:", error);
      alert("프로필 업데이트에 실패했습니다.");
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

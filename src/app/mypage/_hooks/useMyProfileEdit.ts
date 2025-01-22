import type { User } from "@/app/mypage/_types/myPage";
import type { UserData } from "@/app/mypage/_types/profile";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const UseProfileEdit = (onClose: () => void, initialData: User) => {
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

  // 닉네임 유효성 검사 함수
  const validateNickname = (value: string) => {
    // 한글 자음/모음만 있는지 체크
    const hangeulJamoRegex = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
    if (hangeulJamoRegex.test(value)) {
      setNicknameError("완성된 한글을 입력해주세요.");
      return false;
    }

    // 기본 유효성 검사
    const basicRegex = /^[a-zA-Z0-9가-힣]*$/;
    if (!basicRegex.test(value)) {
      setNicknameError("한글, 영문, 숫자만 사용 가능합니다.");
      return false;
    }

    if (!value.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      return false;
    }
    
    if (value.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
      return false;
    }

    if (value.length > 10) {
      setNicknameError("닉네임은 10자 이하여야 합니다.");
      return false;
    }
    
    setNicknameError("");
    return true;
  };

  const checkNicknameDuplicate = async (newNickname: string) => {
    // 현재 닉네임과 같은 경우
    if (newNickname === user?.nickname) {
      setNicknameError("");
      return true;
    }

    // 유효성 검사를 통과하지 못하면 중복 체크 하지 않음
    if (!validateNickname(newNickname)) {
      return false;
    }

    setIsCheckingNickname(true);
    try {
      const { data } = await supabase
        .from("users")
        .select("nickname")
        .eq("nickname", newNickname)
        .neq("id", user?.id || "")
        .maybeSingle();

      if (data) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        return false;
      }
      
      setNicknameError("");
      return true;
    } catch {
      setNicknameError("닉네임 확인에 실패했습니다. 다시 시도해주세요.");
      return false;
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    // 실시간 유효성 검사
    if (validateNickname(newNickname)) {
      // 유효성 검사를 통과한 경우에만 중복 체크 실행 (디바운스 적용)
      const timeoutId = setTimeout(() => {
        if (newNickname !== user?.nickname) {
          checkNicknameDuplicate(newNickname);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
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
      const updates: { nickname?: string; profile_image_url?: string } = {};

      previousData = queryClient.getQueryData<UserData>(["userInfo", user.id]);

      if (previousData) {
        queryClient.setQueryData<UserData>(["userInfo", user.id], {
          ...previousData,
          nickname: nickname !== user.nickname ? nickname : previousData.nickname,
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

        const uploadResult = await supabase.storage
          .from("profile_image")
          .upload(fileName, profileImage);

        if (uploadResult.error) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile_image").getPublicUrl(fileName);
        updates.profile_image_url = publicUrl;
      }

      if (Object.keys(updates).length > 0) {
        const updateResult = await supabase
          .from("users")
          .update(updates)
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다.");
        }
      }

      if (password) {
        const passwordResult = await supabase.auth.updateUser({
          password: password,
        });

        if (passwordResult.error) {
          throw new Error("비밀번호 업데이트에 실패했습니다.");
        }
      }

      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });

      onClose();
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (err) {
      if (previousData) {
        queryClient.setQueryData(["userInfo", user.id], previousData);
      }
      setNicknameError(err instanceof Error ? err.message : "프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
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




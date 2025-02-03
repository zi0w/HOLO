import type { Tables } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useRef, useState } from "react";

export const useProfileChange = () => {
  const { user } = useAuthStore();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: userData, isLoading } = useQuery<
    Tables<"users">,
    Error,
    Tables<"users">
  >({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID is required");

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data as Tables<"users">;
    },
    enabled: !!user?.id,
    gcTime: 1000 * 60 * 30,
    staleTime: 0,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updateData: Partial<Tables<"users">>) => {
      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user!.id);

      if (error) throw error;
    },
    onMutate: async (updateData) => {
      await queryClient.cancelQueries({ queryKey: ["userInfo", user?.id] });
      const previousUserData = queryClient.getQueryData(["userInfo", user?.id]);

      queryClient.setQueryData(
        ["userInfo", user?.id],
        (old: Tables<"users">) => ({
          ...old,
          ...updateData,
        }),
      );

      return { previousUserData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["userInfo", user?.id],
        context?.previousUserData,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
    },
  });

  const handleCancel = (router: AppRouterInstance) => {
    router.push("/mypage");
  };

  const handleSaveClick = async (
    isNicknameValid: boolean,
    checkNicknameDuplicate: (nickname: string) => Promise<boolean>,
    nickname: string,
  ) => {
    if (!isNicknameValid || !(await checkNicknameDuplicate(nickname))) return;
    handleSave(nickname);
  };

  useEffect(() => {
    if (userData) {
      setLocalImageUrl(userData.profile_image_url || null);
      setNickname(userData.nickname);
      setPreviewUrl(userData.profile_image_url || "");
    }
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const handleSave = async (newNickname?: string) => {
    if (!user?.id || !userData) return;

    try {
      if (newNickname && newNickname !== userData.nickname) {
        const updateResult = await supabase
          .from("users")
          .update({ nickname: newNickname })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

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

      await queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
      setIsProfileModalOpen(true);
    } catch {
      alert("프로필 업데이트에 실패했습니다");
    }
  };

  const handlePasswordEditOpen = () => {
    setIsModalOpen(true);
  };

  const handlePasswordEditClose = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
    }
    setIsModalOpen(false);
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  return {
    userData,
    isLoading,
    localImageUrl,
    nickname,
    setNickname,
    handleCancel,
    handleSaveClick,
    isModalOpen,
    isProfileModalOpen,
    profileImage,
    previewUrl,
    fileInputRef,
    handleNicknameUpdate: updateProfileMutation.mutate,
    handleProfileImageUpdate: (url: string) =>
      updateProfileMutation.mutate({ profile_image_url: url }),
    handleImageChange,
    handleSave,
    handlePasswordEditOpen,
    handlePasswordEditClose,
    handleImageButtonClick,
    handleProfileModalClose,
  };
};

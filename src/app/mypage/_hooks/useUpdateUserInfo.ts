import { fetchUserInfo } from "@/app/mypage/_utils/user";
import useAuthStore from "@/store/authStore";
import { useCallback } from "react";

export function useUpdateUserInfo() {
  const { user, setAuth } = useAuthStore();

  const updateUserInfo = useCallback(async () => {
    if (user?.id) {
      const userInfo = await fetchUserInfo(user.id);
      if (userInfo) {
        setAuth(
          {
            ...user,
            nickname: userInfo.nickname,
            profile_image_url: userInfo.profile_image_url,
          },
          null,
        );
      }
    }
  }, [user, setAuth]);

  return updateUserInfo;
}

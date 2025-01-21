import { fetchUserInfo } from "@/app/mypage/_utils/User";
import useAuthStore from "@/store/authStore";
import { useCallback } from "react";

export function useUpdateUserInfo(forceUpdate: boolean = false) {
  const { user, setAuth } = useAuthStore();

  const updateUserInfo = useCallback(async () => {
    if (user?.id) {
      const userInfo = await fetchUserInfo(user.id);
      console.log(user);
      console.log(userInfo);
      if (userInfo) {
        if (
          forceUpdate ||
          user.nickname !== userInfo.nickname ||
          user.profile_image_url !== userInfo.profile_image_url
        ) {
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
    }
  }, [user, setAuth, forceUpdate]);

  return updateUserInfo;
}

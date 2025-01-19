import { fetchUserInfo } from "@/app/mypage/_utils/user";
import useAuthStore from "@/store/authStore";
import { useCallback } from "react";

export function useUpdateUserInfo(forceUpdate: boolean = false) {
  const { user, setAuth } = useAuthStore();

  const updateUserInfo = useCallback(async () => {
    if (user?.id) {
      const userInfo = await fetchUserInfo(user.id);
      if (userInfo) {
        // forceUpdate가 true이거나 실제 변경사항이 있을 때만 업데이트
        if (forceUpdate || 
            user.nickname !== userInfo.nickname || 
            user.profile_image_url !== userInfo.profile_image_url
        ) {
          setAuth(
            {
              ...user,
              nickname: userInfo.nickname,
              profile_image_url: userInfo.profile_image_url,
            },
            null
          );
        }
      }
    }
  }, [user, setAuth, forceUpdate]);

  return updateUserInfo;
}
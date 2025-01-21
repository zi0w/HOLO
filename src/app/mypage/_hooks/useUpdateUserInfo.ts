// src/hooks/useUpdateUserInfo.ts
import { fetchUserInfo } from "@/app/mypage/_utils/User";
import useAuthStore from "@/store/authStore";
import { useCallback } from "react";

export function useUpdateUserInfo(forceUpdate: boolean = false) {
  const { user, session, setAuth } = useAuthStore();

  const updateUserInfo = useCallback(async () => {
    if (!user?.id) return;

    try {
      const userInfo = await fetchUserInfo(user.id);
      
      if (userInfo) {
        const shouldUpdate = forceUpdate || 
          user.nickname !== userInfo.nickname ||
          user.profile_image_url !== userInfo.profile_image_url;

        if (shouldUpdate) {
          setAuth(
            {
              id: user.id,
              email: user.email,
              nickname: userInfo.nickname,
              profile_image_url: userInfo.profile_image_url,
            },
            session // 기존 세션 유지
          );
        }
      }
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  }, [user, session, setAuth, forceUpdate]);

  return updateUserInfo;
}



// import { fetchUserInfo } from "@/app/mypage/_utils/User";
// import useAuthStore from "@/store/authStore";
// import { useCallback } from "react";

// export function useUpdateUserInfo(forceUpdate: boolean = false) {
//   const { user, setAuth } = useAuthStore();

//   const updateUserInfo = useCallback(async () => {
//     if (user?.id) {
//       const userInfo = await fetchUserInfo(user.id);
      
//       if (userInfo) {
//         if (
//           forceUpdate ||
//           user.nickname !== userInfo.nickname ||
//           user.profile_image_url !== userInfo.profile_image_url
//         ) {
//           setAuth(
//             {
//               ...user,
//               nickname: userInfo.nickname,
//               profile_image_url: userInfo.profile_image_url,
//             },
//             null,
//           );
//         }
//       }
//     }
//   }, [user, setAuth, forceUpdate]);

//   return updateUserInfo;
// }

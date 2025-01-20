import { fetchUserInfo } from "@/app/mypage/_utils/user"; // 사용자 정보를 가져오는 함수 임포트
import useAuthStore from "@/store/authStore"; // Zustand 스토어에서 사용자 정보 관리 훅 임포트
import { useCallback,  } from "react"; // React의 useCallback과 useEffect 훅 임포트

// 사용자 정보를 업데이트하는 커스텀 훅
export function useUpdateUserInfo() {
  const { user, setAuth } = useAuthStore(); // Zustand 스토어에서 사용자 정보와 setAuth 함수 가져오기

  // 사용자 정보를 업데이트하는 비동기 함수 정의
  const updateUserInfo = useCallback(async () => {
    if (user?.id) { // 사용자 ID가 존재하는 경우에만 실행
      const userInfo = await fetchUserInfo(user.id); // fetchUserInfo 함수를 호출하여 사용자 정보를 가져옴
      
      if (userInfo) {
        // 이전 값과 새로운 값을 비교하여 실제로 변경된 경우에만 상태를 업데이트
        if (
          user.nickname !== userInfo.nickname || 
          user.profile_image_url !== userInfo.profile_image_url
        ) {
          setAuth(
            {
              ...user, // 기존 사용자 정보 유지
              nickname: userInfo.nickname, // 가져온 닉네임으로 업데이트
              profile_image_url: userInfo.profile_image_url, // 가져온 프로필 이미지 URL로 업데이트
            },
            null // 세션 정보는 null로 설정 (필요에 따라 수정 가능)
          );
        }
      }
    }
  }, [user, setAuth]); // user와 setAuth가 변경될 때마다 updateUserInfo 함수가 새로 생성됨

  return updateUserInfo; // updateUserInfo 함수를 반환하여 외부에서 사용할 수 있도록 함
}

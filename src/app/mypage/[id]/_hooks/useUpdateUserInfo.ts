// hooks/useUpdateUserInfo.ts
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateUserData = {
  nickname?: string;
  profile_image_url?: string;
}

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (data: UpdateUserData) => {
      // 현재 로그인한 사용자 정보 가져오기
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
      }

      if (!userData.user?.id) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      // 사용자 정보 업데이트
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', userData.user.id);

      if (error) {
        console.error('DB 업데이트 오류:', error);
        throw new Error('프로필 업데이트에 실패했습니다.');
      }

      return { success: true };
    },
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      console.log('프로필이 성공적으로 업데이트되었습니다.');
    },
    onError: (error: Error) => {
      console.error('프로필 업데이트 중 오류:', error);
      alert(error.message || '프로필 업데이트 중 오류가 발생했습니다.');
    },
  });
};

export default useUpdateUserInfo;




// import { createClient } from "@/lib/utils/supabase/client";
// import { useMutation } from "@tanstack/react-query";
// import { UpdateUserData } from "@/app/mypage/_types/user";

// const supabase = createClient();

// export const useUpdateUserInfo = () => {
//   return useMutation({
//     mutationFn: async (data: UpdateUserData) => {
//       const { error } = await supabase
//         .from('users')
//         .update(data)
//         .eq('id', (await supabase.auth.getUser()).data.user?.id);

//       if (error) throw error;
//     },
//   });
// }; 
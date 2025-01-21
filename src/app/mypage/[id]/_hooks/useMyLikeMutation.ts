// hooks/useLikeMutation.ts
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error('좋아요 처리 중 오류가 발생했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['likedPosts'] });
    },
    onError: (error) => {
      console.error('좋아요 처리 중 오류:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    },
  });
};






// components/KakaoLoginButton.tsx
import { createClient } from "@/lib/utils/supabase/client";


const supabase = createClient();
const KakaoLoginButton: React.FC = () => {
  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:3000/api/auth/callback",
      },
    });

    if (error) {
      console.error("Error signing in with Kakao:", error.message);
    }
  };

  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-yellow-600 text-white"
      onClick={signInWithKakao}
    >
      Kakao
    </button>
  );
};

export default KakaoLoginButton;

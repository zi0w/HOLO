// // components/GoogleLoginButton.tsx
// import { createClient } from "@/lib/utils/supabase/client";

// const supabase = createClient();

// const GoogleLoginButton: React.FC = () => {
//   const signInWithGoogle = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://localhost:3000/api/auth/callback", 
//       },
//     });

//     if (error) {
//       console.error("Error signing in with Google:", error.message);
//     }
//   };

//   return (
//     <button
//       onClick={signInWithGoogle}
//       className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-red-600 text-white"
//     >
//       Google
//     </button>
//   );
// };

// export default GoogleLoginButton;

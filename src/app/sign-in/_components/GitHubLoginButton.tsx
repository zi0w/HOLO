// // components/GitHubLoginButton.tsx
// import { createClient } from "@/lib/utils/supabase/client";
// import React from "react";

// const supabase = createClient();

// const GitHubLoginButton: React.FC = () => {
//   const signInWithGitHub = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "github",
//       options: {
//         redirectTo: "http://localhost:3000/api/auth/callback",
//       },
//     });

//     if (error) {
//       console.error("Error signing in with GitHub:", error.message);
//     }
//   };

//   return (
//     <button
//       className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-blue-300 text-white"
//       onClick={signInWithGitHub}
//     >
//       GitHub
//     </button>
//   );
// };

// export default GitHubLoginButton;

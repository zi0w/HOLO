// import type { ProfileFormProps } from "@/app/mypage/_types/user";

// const ProfileForm = ({
//   nickname,
//   password,
//   confirmPassword,
//   nicknameError,
//   passwordError,
//   onNicknameChange,
//   onPasswordChange,
//   onConfirmPasswordChange,
// }: Omit<ProfileFormProps, "isCheckingNickname">) => {
//   return (
//     <>
//       <div className="mb-4 h-[90px]">
//         <label className="mb-2 block">닉네임</label>
//         <input
//           type="text"
//           value={nickname}
//           onChange={onNicknameChange}
//           className={`w-full border p-2 ${nicknameError ? "border-red-500" : ""}`}
//           placeholder="2-10자 사이로 입력해주세요"
//         />
//         <div className="h-[24px]">
//           {nicknameError && (
//             <p className="mt-1 text-sm text-red-500">{nicknameError}</p>
//           )}
//         </div>
//       </div>

//       <div className="mb-4 h-[80px]">
//         <label className="mb-2 block">새 비밀번호</label>
//         <input
//           type="password"
//           value={password}
//           onChange={onPasswordChange}
//           className="w-full border p-2"
//           placeholder="변경하지 않으려면 비워두세요"
//         />
//       </div>

//       <div className="mb-4 h-[90px]">
//         <label className="mb-2 block">새 비밀번호 확인</label>
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={onConfirmPasswordChange}
//           className="w-full border p-2"
//           placeholder="비밀번호를 다시 입력하세요"
//         />
//         <div className="h-[24px]">
//           {passwordError && (
//             <p className="mt-1 text-sm text-red-500">{passwordError}</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileForm;

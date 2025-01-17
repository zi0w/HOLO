"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import useAuthStore from "@/store/authStore";

// Supabase 클라이언트 생성
const supabase = createClient();

// 타입 정의
export type User = {
  id: string;
  email: string;
  nickname: string;
  profile_image_url: string | null;
  created_at: string;
};

export type ProfileEditModalProps = {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 함수
};

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무 것도 렌더링하지 않음

  // Zustand를 사용하여 사용자 정보 가져오기
  const { user } = useAuthStore.getState();
  
  const [nickname, setNickname] = useState(user?.nickname || ""); // 닉네임 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [profileImage, setProfileImage] = useState<string | null>(user?.profile_image_url); // 프로필 이미지 상태

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // 프로필 수정 함수
  const handleSave = async () => {
    if (!user?.id) {
      alert("사용자 ID를 찾을 수 없습니다."); // 사용자 ID가 없는 경우 경고 메시지 표시
      return; // 함수 종료
    }

    try {
      let updates: any = {};

      // 닉네임이 입력되면 업데이트
      if (nickname) {
        updates.nickname = nickname;
      }

      // 비밀번호가 입력되면 업데이트
      if (password) {
        updates.password = password;
      }

      // 프로필 이미지가 입력되면 업데이트 (여기서는 URL로 가정)
      if (profileImage) {
        updates.profile_image_url = profileImage;
      }

      // Supabase에 업데이트 요청
      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id); // user.id가 존재할 때만 사용

      if (error) throw error;

      alert("프로필이 성공적으로 업데이트되었습니다.");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} // 모달 외부 클릭 이벤트 핸들러 추가
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" style={{ minHeight: "400px" }}>
        <h2 className="mb-4 text-center text-xl font-semibold">프로필 수정</h2>

        {/* 동그란 이미지 수정 버튼 */}
        <button className="mx-auto mb-4 block flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200">
          <span className="text-center">📷</span> {/* 아이콘 또는 텍스트 */}
        </button>

        <hr className="mb-4" />
        <div className="flex flex-col space-y-6">
          <h1>닉네임</h1>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} // 닉네임 입력 시 상태 업데이트
            className="rounded border border-gray-300 p-2"
          />
          <h1>비밀번호</h1>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 시 상태 업데이트
            className="rounded border border-gray-300 p-2"
          />
          <h1>비밀번호 확인</h1>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 입력 시 상태 업데이트
            className="rounded border border-gray-300 p-2"
          />
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button 
            onClick={handleSave} 
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;




// "use client";

// import React, { useEffect, useState } from "react";
// import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
// import useAuthStore from "@/store/authStore";


// // Supabase 클라이언트 생성
// const supabase = createClient();

// // 타입 정의
// export type User = {
//   id: string;
//   email: string;
//   nickname: string;
//   profile_image_url: string | null;
//   created_at: string;
// };

// export type ProfileEditModalProps = {
//   isOpen: boolean; // 모달 열림 여부
//   onClose: () => void; // 모달 닫기 함수
// };

// const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   if (!isOpen) return null; // 모달이 열리지 않으면 아무 것도 렌더링하지 않음

//   // Zustand를 사용하여 사용자 정보 가져오기
//   const { user } = useAuthStore.getState();
  
//   const [nickname, setNickname] = useState(user?.nickname || ""); // 닉네임 상태
//   const [password, setPassword] = useState(""); // 비밀번호 상태
//   const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
//   const [profileImage, setProfileImage] = useState<string | null>(user?.profile_image_url); // 프로필 이미지 상태

//   // 모달 외부 클릭 시 닫기
//   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   // 프로필 수정 함수
//   const handleSave = async () => {
//     try {
//       let updates: any = {};

//       // 닉네임이 입력되면 업데이트
//       if (nickname) {
//         updates.nickname = nickname;
//       }

//       // 비밀번호가 입력되면 업데이트
//       if (password) {
//         updates.password = password;
//       }

//       // 프로필 이미지가 입력되면 업데이트 (여기서는 URL로 가정)
//       if (profileImage) {
//         updates.profile_image_url = profileImage;
//       }

//       // user?.id가 존재할 때만 업데이트 요청을 보냄
//       if (user?.id) {
//         const { error } = await supabase
//           .from("users")
//           .update(updates)
//           .eq("id", user.id); // user.id가 undefined가 아닐 때만 사용

//         if (error) throw error;

//         alert("프로필이 성공적으로 업데이트되었습니다.");
//         onClose(); // 모달 닫기
//       } else {
//         alert("사용자 ID를 찾을 수 없습니다."); // 사용자 ID가 없는 경우 경고 메시지 표시
//       }
//     } catch (error) {
//       console.error("프로필 업데이트 중 오류 발생:", error);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       onClick={handleOverlayClick} // 모달 외부 클릭 이벤트 핸들러 추가
//     >
//       <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" style={{ minHeight: "400px" }}>
//         <h2 className="mb-4 text-center text-xl font-semibold">프로필 수정</h2>

//         {/* 동그란 이미지 수정 버튼 */}
//         <button className="mx-auto mb-4 block flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200">
//           <span className="text-center">📷</span> {/* 아이콘 또는 텍스트 */}
//         </button>

//         <hr className="mb-4" />
//         <div className="flex flex-col space-y-6">
//           <h1>닉네임</h1>
//           <input
//             type="text"
//             placeholder="닉네임"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)} // 닉네임 입력 시 상태 업데이트
//             className="rounded border border-gray-300 p-2"
//           />
//           <h1>비밀번호</h1>
//           <input
//             type="password"
//             placeholder="비밀번호"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 시 상태 업데이트
//             className="rounded border border-gray-300 p-2"
//           />
//           <h1>비밀번호 확인</h1>
//           <input
//             type="password"
//             placeholder="비밀번호 확인"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 입력 시 상태 업데이트
//             className="rounded border border-gray-300 p-2"
//           />
//         </div>

//         <div className="mt-6 flex justify-center space-x-4">
//           <button 
//             onClick={handleSave} 
//             className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//           >
//             저장
//           </button>
//           <button
//             onClick={onClose}
//             className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
//           >
//             취소
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileEditModal;



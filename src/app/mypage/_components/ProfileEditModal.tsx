"use client";

import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import useAuthStore from "@/store/authStore"; // Zustand를 사용하여 사용자 정보 가져오기
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // UUID 생성기

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
  const { user } = useAuthStore.getState();

  const [nickname, setNickname] = useState(user?.nickname || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string>(
    user?.profile_image_url || "/path/to/default/profile_image.png",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      alert("사용자 ID를 찾을 수 없습니다.");
      return;
    }

    try {
      const updates: {
        nickname?: string;
        password?: string;
        profile_image_url?: string;
      } = {};

      if (nickname) {
        updates.nickname = nickname;
      }

      if (password) {
        if (password !== confirmPassword) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
        }
        updates.password = password;
      }

      if (imageFile) {
        const fileName = `profile_image_${uuidv4()}.png`;
        await supabase.storage
          .from("profile_image")
          .upload(fileName, imageFile);

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile_image/${fileName}`;
        updates.profile_image_url = imageUrl;

        alert("프로필 이미지가 성공적으로 업로드되었습니다.");
      }

      if (Object.keys(updates).length > 0) {
        const { error } = await supabase
          .from("users")
          .update(updates)
          .eq("id", user.id);
        if (error) throw error;
      }

      alert("프로필이 성공적으로 업데이트되었습니다.");
      onClose();
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        style={{ minHeight: "400px" }}
      >
        <h2 className="mb-4 text-center text-xl font-semibold">프로필 수정</h2>

        <button
          className="mx-auto mb-4 block flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <span className="text-center">📷</span>
        </button>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <Image
          src={profileImage}
          alt="Profile Preview"
          className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
          width={96}
          height={96}
        />

        <hr className="mb-4" />

        <div className="flex flex-col space-y-6">
          <h1>닉네임</h1>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="rounded border border-gray-300 p-2"
          />

          <h1>비밀번호</h1>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-gray-300 p-2"
          />

          <h1>비밀번호 확인</h1>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

// //완성본

// "use client";

// import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
// import useAuthStore from "@/store/authStore"; // Zustand를 사용하여 사용자 정보 가져오기
// import Image from "next/image";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid"; // UUID 생성기

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
//   const [profileImage, setProfileImage] = useState<string>(
//     user?.profile_image_url || "/path/to/default/profile_image.png",
//   ); // 프로필 이미지 상태 (기본 이미지 경로)
//   const [imageFile, setImageFile] = useState<File | null>(null); // 선택된 이미지 파일 상태

//   // 모달 외부 클릭 시 닫기
//   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   // 프로필 수정 함수
//   const handleSave = async () => {
//     if (!user?.id) {
//       alert("사용자 ID를 찾을 수 없습니다."); // 사용자 ID가 없는 경우 경고 메시지 표시
//       return; // 함수 종료
//     }

//     try {
//       let updates: any = {};

//       // 닉네임이 입력되면 업데이트
//       if (nickname) {
//         updates.nickname = nickname;
//       }

//       // 비밀번호가 입력되면 업데이트 (비밀번호 확인과 일치하는지 체크)
//       if (password) {
//         if (password !== confirmPassword) {
//           alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
//           return; // 함수 종료
//         }
//         updates.password = password;
//       }

//       // 프로필 이미지가 선택되면 Supabase에 업로드
//       if (imageFile) {
//         const fileName = `profile_image_${uuidv4()}.png`; // 고유한 파일 이름 생성
//         const { data, error } = await supabase.storage
//           .from("profile_image")
//           .upload(fileName, imageFile);

//         if (error) {
//           alert("프로필 이미지 업로드 중 오류가 발생했습니다.");
//           console.error("Upload Error:", error);
//           return;
//         }

//         const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile_image/${fileName}`;
//         updates.profile_image_url = imageUrl; // 반환된 URL로 업데이트

//         alert("프로필 이미지가 성공적으로 업로드되었습니다.");
//       }

//       // Supabase에 업데이트 요청 (업데이트할 필드가 있을 때만)
//       if (Object.keys(updates).length > 0) {
//         const { error } = await supabase
//           .from("users")
//           .update(updates)
//           .eq("id", user.id); // user.id가 존재할 때만 사용

//         if (error) throw error;
//       }

//       alert("프로필이 성공적으로 업데이트되었습니다.");
//       onClose(); // 모달 닫기
//     } catch (error) {
//       console.error("프로필 업데이트 중 오류 발생:", error);
//       alert("프로필 업데이트 중 오류가 발생했습니다."); // 사용자에게 오류 메시지 표시
//     }
//   };

//   // 이미지 파일 선택 핸들러
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file); // 선택한 파일 상태 업데이트

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result as string); // 미리보기용으로 상태 업데이트
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       onClick={handleOverlayClick} // 모달 외부 클릭 이벤트 핸들러 추가
//     >
//       <div
//         className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
//         style={{ minHeight: "400px" }}
//       >
//         <h2 className="mb-4 text-center text-xl font-semibold">프로필 수정</h2>

//         {/* 동그란 이미지 수정 버튼 */}
//         <button
//           className="mx-auto mb-4 block flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200"
//           onClick={() => document.getElementById("file-input")?.click()} // 파일 입력 클릭 이벤트 설정
//         >
//           <span className="text-center">📷</span> {/* 아이콘 또는 텍스트 */}
//         </button>

//         {/* 파일 입력 요소 */}
//         <input
//           id="file-input"
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="hidden"
//         />

//         {/* 프로필 이미지 미리보기 */}
//         <Image
//           src={profileImage}
//           alt="Profile Preview"
//           className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
//         />

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

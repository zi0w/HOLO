"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/common/Loading";
import { PasswordChangeModal } from "@/app/mypage/_components/PasswordChangeModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";
import profileEditIcon from "@/assets/images/mypage/profileedit.png";


const ImageNicknameForm = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const supabase = createClient();
  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    nickname,
    isNicknameValid,
    nicknameError,
    handleNicknameChange,
    checkNicknameDuplicate,
  } = useUpdateUserInfo(user?.id || "");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User ID is required");

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    gcTime: 1000 * 60 * 30,
    staleTime: 0,
  });

  useEffect(() => {
    if (userData) {
      handleNicknameChange(userData.nickname || "");
      setPreviewUrl(userData.profile_image_url || defaultImageUrl);
    }
  }, [userData, handleNicknameChange]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCancel = () => {
    router.push("/mypage");
  };

  const handleSave = async () => {
    if (!user?.id || !userData) return;
    if (!isNicknameValid || !(await checkNicknameDuplicate(nickname))) return;

    try {
      const updates: { nickname?: string; profile_image_url?: string } = {};

      if (nickname !== userData.nickname) {
        updates.nickname = nickname;
        const updateResult = await supabase
          .from("users")
          .update({ nickname })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      if (profileImage) {
        const fileExt = profileImage.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const uploadResult = await supabase.storage
          .from("profile_image")
          .upload(fileName, profileImage);

        if (uploadResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("profile_image").getPublicUrl(fileName);

        const updateResult = await supabase
          .from("users")
          .update({ profile_image_url: publicUrl })
          .eq("id", user.id);

        if (updateResult.error) {
          throw new Error("프로필 업데이트에 실패했습니다");
        }
      }

      await queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
      alert("프로필 업데이트에 성공했습니다");
      router.push("/mypage");
    } catch {
      alert("프로필 업데이트에 실패했습니다");
    }
  };

  const handlePasswordEditOpen = () => {
    setIsModalOpen(true);
  };

  const handlePasswordEditClose = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
    }
    setIsModalOpen(false);
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-50">
        <div className="relative h-[874px] w-[402px] bg-base-50 px-5">
          <button
            className="absolute left-4 top-4"
            onClick={() => router.push("/mypage")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#424242"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="pt-[60px] font-gmarket text-[24px] font-medium leading-[32px] text-base-800 ">
            프로필 수정
          </h1>
          <div className="relative mx-auto mt-8 h-[120px] w-[120px]">
            <Image
              src={previewUrl}
              alt="프로필 이미지"
              fill
              className="rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full "
              onClick={handleImageButtonClick}
            >
             <Image
                src={profileEditIcon}
                alt="프로필 수정"
                width={32}
                height={32}
                className="transition-transform hover:scale-110"
              />
            </button>
          </div>
          <div className="mt-12 space-y-4">
            <div className="space-y-2">
              <label className="font-gmarket text-[14px] font-normal leading-[20px] text-base-800">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
                className={`h-[56px] w-full rounded-[4px] border px-4 text-[14px] text-base-800 ${
                  nicknameError ? "border-primary-500" : "border-base-500"
                }`}
              />
              {nicknameError && (
                <p className="mt-1 text-sm text-primary-500">{nicknameError}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-gmarket text-[14px] font-normal leading-[20px] text-base-800">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="●●●●●●●●●●●●"
                  className="h-[56px] w-full rounded-[4px] border border-base-500 px-4 text-[14px] text-base-500"
                  readOnly
                />
                <button
                  className="absolute right-4 top-1/2 flex h-[28px] w-[37px] -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border border-base-500 text-[14px] font-medium text-base-800"
                  onClick={handlePasswordEditOpen}
                >
                  수정
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-14 left-5 right-5 space-y-4">
            <button
              className="h-[48px] w-full rounded-[4px] border border-base-50 text-[16px] font-medium text-base-800"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className="h-[48px] w-full rounded-[4px] bg-primary-500 text-[16px] font-medium text-base-50"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <PasswordChangeModal
            isOpen={isModalOpen}
            onClose={handlePasswordEditClose}
          />
        </div>
      )}
    </>
  );
};

export default ImageNicknameForm;




//완성본
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { createClient } from "@/lib/utils/supabase/client";
// import useAuthStore from "@/store/authStore";
// import Loading from "@/components/common/Loading";
// import { PasswordChangeModal } from "@/app/mypage/_components/PasswordChangeModal";
// import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";

// const ImageNicknameForm = () => {
//   const router = useRouter();
//   const { user } = useAuthStore();
//   const queryClient = useQueryClient();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const supabase = createClient();
//   const defaultImageUrl =
//     "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const {
//     nickname,
//     isNicknameValid,
//     nicknameError,
//     handleNicknameChange,
//     checkNicknameDuplicate,
//   } = useUpdateUserInfo(user?.id || "");

//   const { data: userData, isLoading } = useQuery({
//     queryKey: ["userInfo", user?.id],
//     queryFn: async () => {
//       if (!user?.id) throw new Error("User ID is required");

//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (error) throw error;
//       return data;
//     },
//     enabled: !!user?.id,
//     gcTime: 1000 * 60 * 30,
//     staleTime: 0,
//   });

//   useEffect(() => {
//     if (userData) {
//       handleNicknameChange(userData.nickname || "");
//       setPreviewUrl(userData.profile_image_url || defaultImageUrl);
//     }
//   }, [userData, handleNicknameChange]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         alert("이미지 크기는 5MB 이하여야 합니다.");
//         return;
//       }
//       setProfileImage(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };

//   const handleCancel = () => {
//     router.push("/mypage");
//   };

//   const handleSave = async () => {
//     if (!user?.id || !userData) return;
//     if (!isNicknameValid || !(await checkNicknameDuplicate(nickname))) return;

//     try {
//       const updates: { nickname?: string; profile_image_url?: string } = {};

//       if (nickname !== userData.nickname) {
//         updates.nickname = nickname;
//         const updateResult = await supabase
//           .from("users")
//           .update({ nickname })
//           .eq("id", user.id);

//         if (updateResult.error) {
//           throw new Error("프로필 업데이트에 실패했습니다");
//         }
//       }

//       if (profileImage) {
//         const fileExt = profileImage.name.split(".").pop();
//         const fileName = `${user.id}-${Date.now()}.${fileExt}`;

//         const uploadResult = await supabase.storage
//           .from("profile_image")
//           .upload(fileName, profileImage);

//         if (uploadResult.error) {
//           throw new Error("프로필 업데이트에 실패했습니다");
//         }

//         const {
//           data: { publicUrl },
//         } = supabase.storage.from("profile_image").getPublicUrl(fileName);

//         const updateResult = await supabase
//           .from("users")
//           .update({ profile_image_url: publicUrl })
//           .eq("id", user.id);

//         if (updateResult.error) {
//           throw new Error("프로필 업데이트에 실패했습니다");
//         }
//       }

//       await queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
//       alert("프로필 업데이트에 성공했습니다");
//       router.push("/mypage");
//     } catch {
//       alert("프로필 업데이트에 실패했습니다");
//     }
//   };

//   const handlePasswordEditOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handlePasswordEditClose = () => {
//     if (user?.id) {
//       queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
//     }
//     setIsModalOpen(false);
//   };

//   const handleImageButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   if (isLoading || !userData) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="relative h-[874px] w-[402px] bg-white px-5">
//           <button
//             className="absolute left-4 top-4"
//             onClick={() => router.push("/mypage")}
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M15 18L9 12L15 6"
//                 stroke="#424242"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//           <h1 className="pt-[60px] font-gmarket text-[24px] font-medium leading-[32px] text-[#424242]">
//             프로필 수정
//           </h1>
//           <div className="relative mx-auto mt-8 h-[120px] w-[120px]">
//             <Image
//               src={previewUrl}
//               alt="프로필 이미지"
//               fill
//               className="rounded-full object-cover"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleImageChange}
//             />
//             <button
//               className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7600]"
//               onClick={handleImageButtonClick}
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M16 4H8C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6C18 4.89543 17.1046 4 16 4Z"
//                   stroke="white"
//                   strokeWidth="2"
//                 />
//                 <path
//                   d="M12 8V16"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M8 12H16"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="mt-12 space-y-4">
//             <div className="space-y-2">
//               <label className="font-gmarket text-[14px] font-normal leading-[20px] text-[#424242]">
//                 닉네임
//               </label>
//               <input
//                 type="text"
//                 value={nickname}
//                 onChange={(e) => handleNicknameChange(e.target.value)}
//                 className={`h-[56px] w-full rounded-[4px] border px-4 text-[14px] text-[#424242] ${
//                   nicknameError ? "border-red-500" : "border-[#999E98]"
//                 }`}
//               />
//               {nicknameError && (
//                 <p className="mt-1 text-sm text-red-500">{nicknameError}</p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <label className="font-gmarket text-[14px] font-normal leading-[20px] text-[#424242]">
//                 비밀번호
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   value="●●●●●●●●●●●●"
//                   className="h-[56px] w-full rounded-[4px] border border-[#999E98] px-4 text-[14px] text-[#909090]"
//                   readOnly
//                 />
//                 <button
//                   className="absolute right-4 top-1/2 flex h-[28px] w-[37px] -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border border-[#BDBDBD] text-[14px] font-medium text-[#424242]"
//                   onClick={handlePasswordEditOpen}
//                 >
//                   수정
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="absolute bottom-14 left-5 right-5 space-y-4">
//             <button
//               className="h-[48px] w-full rounded-[4px] border border-[#BDBDBD] text-[16px] font-medium text-[#424242]"
//               onClick={handleCancel}
//             >
//               취소
//             </button>
//             <button
//               className="h-[48px] w-full rounded-[4px] bg-[#FF7600] text-[16px] font-medium text-white"
//               onClick={handleSave}
//             >
//               저장
//             </button>
//           </div>
//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center">
//           <PasswordChangeModal
//             isOpen={isModalOpen}
//             onClose={handlePasswordEditClose}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageNicknameForm;




// // "use client";

// // import Image from "next/image";
// // import { useRouter } from "next/navigation";
// // import { useState, useEffect, useRef } from "react";
// // import { useQuery, useQueryClient } from "@tanstack/react-query";
// // import { createClient } from "@/lib/utils/supabase/client";
// // import useAuthStore from "@/store/authStore";
// // import Loading from "@/components/common/Loading";
// // import { PasswordChangeModal } from "@/app/mypage/_components/PasswordChangeModal";


// // const ImageNicknameForm = () => {
// //   const router = useRouter();
// //   const { user } = useAuthStore();
// //   const queryClient = useQueryClient();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [nickname, setNickname] = useState("");
// //   const [nicknameError, setNicknameError] = useState("");
// //   const [profileImage, setProfileImage] = useState<File | null>(null);
// //   const [previewUrl, setPreviewUrl] = useState("");
// //   const supabase = createClient();
// //   const defaultImageUrl =
// //     "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";
// //   const fileInputRef = useRef<HTMLInputElement | null>(null);

// //   const { data: userData, isLoading } = useQuery({
// //     queryKey: ["userInfo", user?.id],
// //     queryFn: async () => {
// //       if (!user?.id) throw new Error("User ID is required");

// //       const { data, error } = await supabase
// //         .from("users")
// //         .select("*")
// //         .eq("id", user.id)
// //         .single();

// //       if (error) throw error;
// //       return data;
// //     },
// //     enabled: !!user?.id,
// //     gcTime: 1000 * 60 * 30,
// //     staleTime: 0,
// //   });

// //   useEffect(() => {
// //     if (userData) {
// //       setNickname(userData.nickname || "");
// //       setPreviewUrl(userData.profile_image_url || defaultImageUrl);
// //     }
// //   }, [userData]);

// //   const validateNickname = (value: string) => {
// //     const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
// //     if (!value.trim()) {
// //       setNicknameError("닉네임을 입력해주세요.");
// //       return false;
// //     }
// //     if (!nicknameRegex.test(value)) {
// //       setNicknameError("닉네임은 2~10자의 한글, 영문, 숫자만 사용 가능합니다.");
// //       return false;
// //     }
// //     setNicknameError("");
// //     return true;
// //   };

// //   const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newNickname = e.target.value;
// //     setNickname(newNickname);
// //     validateNickname(newNickname);
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       if (file.size > 5 * 1024 * 1024) {
// //         alert("이미지 크기는 5MB 이하여야 합니다.");
// //         return;
// //       }
// //       setProfileImage(file);
// //       const url = URL.createObjectURL(file);
// //       setPreviewUrl(url);
// //     }
// //   };

// //   const handleCancel = () => {
// //     router.push("/mypage");
// //   };

// //   const handleSave = async () => {
// //     if (!user?.id || !userData) return;
// //     if (!validateNickname(nickname)) return;

// //     try {
// //       const updates: { nickname?: string; profile_image_url?: string } = {};

// //       if (nickname !== userData.nickname) {
// //         updates.nickname = nickname;
// //         const updateResult = await supabase
// //           .from("users")
// //           .update({ nickname })
// //           .eq("id", user.id);

// //         if (updateResult.error) {
// //           throw new Error("프로필 업데이트에 실패했습니다");
// //         }
// //       }

// //       if (profileImage) {
// //         const fileExt = profileImage.name.split(".").pop();
// //         const fileName = `${user.id}-${Date.now()}.${fileExt}`;

// //         const uploadResult = await supabase.storage
// //           .from("profile_image")
// //           .upload(fileName, profileImage);

// //         if (uploadResult.error) {
// //           throw new Error("프로필 업데이트에 실패했습니다");
// //         }

// //         const {
// //           data: { publicUrl },
// //         } = supabase.storage.from("profile_image").getPublicUrl(fileName);

// //         const updateResult = await supabase
// //           .from("users")
// //           .update({ profile_image_url: publicUrl })
// //           .eq("id", user.id);

// //         if (updateResult.error) {
// //           throw new Error("프로필 업데이트에 실패했습니다");
// //         }
// //       }

// //       await queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
// //       alert("프로필 업데이트에 성공했습니다");
// //       router.push("/mypage");
// //     } catch {
// //       alert("프로필 업데이트에 실패했습니다");
// //     }
// //   };

// //   const handlePasswordEditOpen = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handlePasswordEditClose = () => {
// //     if (user?.id) {
// //       queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
// //     }
// //     setIsModalOpen(false);
// //   };

// //   const handleImageButtonClick = () => {
// //     fileInputRef.current?.click();
// //   };

// //   if (isLoading || !userData) {
// //     return (
// //       <div className="flex h-screen items-center justify-center">
// //         <Loading />
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //         <div className="relative h-[874px] w-[402px] bg-white px-5">
// //           <button
// //             className="absolute left-4 top-4"
// //             onClick={() => router.push("/mypage")}
// //           >
// //             <svg
// //               width="24"
// //               height="24"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               xmlns="http://www.w3.org/2000/svg"
// //             >
// //               <path
// //                 d="M15 18L9 12L15 6"
// //                 stroke="#424242"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               />
// //             </svg>
// //           </button>
// //           <h1 className="pt-[60px] font-gmarket text-[24px] font-medium leading-[32px] text-[#424242]">
// //             프로필 수정
// //           </h1>
// //           <div className="relative mx-auto mt-8 h-[120px] w-[120px]">
// //             <Image
// //               src={previewUrl}
// //               alt="프로필 이미지"
// //               fill
// //               className="rounded-full object-cover"
// //             />
// //             <input
// //               type="file"
// //               accept="image/*"
// //               ref={fileInputRef}
// //               className="hidden"
// //               onChange={handleImageChange}
// //             />
// //             <button
// //               className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7600]"
// //               onClick={handleImageButtonClick}
// //             >
// //               <svg
// //                 width="24"
// //                 height="24"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 xmlns="http://www.w3.org/2000/svg"
// //               >
// //                 <path
// //                   d="M16 4H8C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6C18 4.89543 17.1046 4 16 4Z"
// //                   stroke="white"
// //                   strokeWidth="2"
// //                 />
// //                 <path
// //                   d="M12 8V16"
// //                   stroke="white"
// //                   strokeWidth="2"
// //                   strokeLinecap="round"
// //                 />
// //                 <path
// //                   d="M8 12H16"
// //                   stroke="white"
// //                   strokeWidth="2"
// //                   strokeLinecap="round"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //           <div className="mt-12 space-y-4">
// //             <div className="space-y-2">
// //               <label className="font-gmarket text-[14px] font-normal leading-[20px] text-[#424242]">
// //                 닉네임
// //               </label>
// //               <input
// //                 type="text"
// //                 value={nickname}
// //                 onChange={handleNicknameChange}
// //                 className={`h-[56px] w-full rounded-[4px] border px-4 text-[14px] text-[#424242] ${
// //                   nicknameError ? "border-red-500" : "border-[#999E98]"
// //                 }`}
// //               />
// //               {nicknameError && (
// //                 <p className="mt-1 text-sm text-red-500">{nicknameError}</p>
// //               )}
// //             </div>
// //             <div className="space-y-2">
// //               <label className="font-gmarket text-[14px] font-normal leading-[20px] text-[#424242]">
// //                 비밀번호
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="password"
// //                   value="●●●●●●●●●●●●"
// //                   className="h-[56px] w-full rounded-[4px] border border-[#999E98] px-4 text-[14px] text-[#909090]"
// //                   readOnly
// //                 />
// //                 <button
// //                   className="absolute right-4 top-1/2 flex h-[28px] w-[37px] -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border border-[#BDBDBD] text-[14px] font-medium text-[#424242]"
// //                   onClick={handlePasswordEditOpen}
// //                 >
// //                   수정
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="absolute bottom-14 left-5 right-5 space-y-4">
// //             <button
// //               className="h-[48px] w-full rounded-[4px] border border-[#BDBDBD] text-[16px] font-medium text-[#424242]"
// //               onClick={handleCancel}
// //             >
// //               취소
// //             </button>
// //             <button
// //               className="h-[48px] w-full rounded-[4px] bg-[#FF7600] text-[16px] font-medium text-white"
// //               onClick={handleSave}
// //             >
// //               저장
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       {isModalOpen && (
// //         <div className="fixed inset-0 z-[60] flex items-center justify-center">
// //           <PasswordChangeModal
// //             isOpen={isModalOpen}
// //             onClose={handlePasswordEditClose}
// //           />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default ImageNicknameForm;


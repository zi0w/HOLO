import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { user } = useAuthStore();
  const updateUserInfo = useUpdateUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  // 프로필 이미지 URL이 없을 경우 기본 이미지 URL을 설정
  const profileImageUrl = user.profile_image_url || "/path/to/default/image.png"; // 기본 이미지 경로

  return (
    <>
      <button className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100">
        <Image
          src={profileImageUrl} // 기본 이미지 또는 사용자 이미지를 사용
          alt="프로필 이미지"
          className="h-full w-full rounded-full object-cover"
        />
      </button>
      <div className="mb-4 ml-2 flex items-center">
        <h1 className="mr-2">{user.nickname}</h1>
        <button onClick={handleOpenModal}>✏️</button>
      </div>
      <ProfileEditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default UserProfile;

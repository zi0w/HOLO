import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import { useUpdateUserInfo } from "@/app/mypage/_hooks/useUpdateUserInfo";
import useAuthStore from "@/store/authStore";
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

  return (
    <div className="flex flex-col items-center">
      <button className="mb-2 flex h-[120px] w-[120px] items-center justify-center rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100">
        <img
          src={user.profile_image_url}
          alt="프로필 이미지"
          className="h-full w-full rounded-full object-cover"
        />
      </button>
      <div className="mb-4 flex items-center">
        <h2 className="mr-2 text-lg font-semibold">{user.nickname}</h2>
        <button onClick={handleOpenModal} className="text-gray-600 hover:text-gray-800">✏️</button>
      </div>
      <ProfileEditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default UserProfile;

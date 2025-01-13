import useAuthStore from "@/store/authStore";
import ProfileEditModal from "./ProfileEditModal";
import { useEffect, useState } from "react";
import { useUpdateUserInfo } from "../_hooks/UseruserInfo";

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
      <>
        <button className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100">
          <img src={user.profile_image_url} alt="프로필 이미지" className="h-full w-full rounded-full object-cover" />
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
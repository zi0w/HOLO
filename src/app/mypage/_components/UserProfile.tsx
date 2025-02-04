"use client";

import { useProfileChange } from "@/app/mypage/_hooks/useProfileChangeHooks";
import ProfileEditIcon from "@/assets/images/mypage/profileedit.svg";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const {
    userData,
    isLoading,
    localImageUrl,
    handleNicknameUpdate,
    handleProfileImageUpdate,
  } = useProfileChange();

  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  const handleBlur = () => {
    if (userData?.nickname) {
      handleNicknameUpdate({ nickname: userData.nickname });
    }
  };

  const handleImageError = async (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== defaultImageUrl) {
      try {
        const response = await fetch(target.src);
        const blob = await response.blob();
        const file = new File([blob], "profile.webp", { type: blob.type });
        await handleProfileImageUpdate(file);
      } catch {
        target.src = defaultImageUrl;
        handleProfileImageUpdate(
          new File([defaultImageUrl], "default.jpg", { type: "image/jpeg" }),
        );
      }
    }
  };

  if (isLoading || !userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full bg-white pt-16">
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center px-5 pt-[5px] lg:px-0 lg:pl-[calc(50vw-400px)]">
          <button className="flex items-center">
            <h1 className="common-title text-2xl font-medium leading-8 text-base-800">
              마이페이지
            </h1>
          </button>
        </div>

        <div className="relative mt-12 h-32 w-32">
          <Image
            src={localImageUrl || defaultImageUrl}
            alt="프로필 이미지"
            width={128}
            height={128}
            className="h-[128px] w-[128px] rounded-full object-cover"
            priority
            quality={75}
            sizes="128px"
            onError={handleImageError}
          />
          <button
            onClick={() => router.push("/mypage/edit")}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full"
            aria-label="프로필 수정"
          >
            <ProfileEditIcon className="transition-transform hover:scale-110" />
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <div
            onBlur={handleBlur}
            className="flex h-8 items-center justify-center text-lg font-medium text-base-800 focus:outline-none"
          >
            {userData.nickname || ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


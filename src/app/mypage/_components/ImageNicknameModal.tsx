"use client";

import Image from "next/image";

const ImageNicknameModal = () => {
  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative h-[874px] w-[402px] bg-white px-5">
        <button className="absolute left-4 top-4">
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

        <h1 className="pt-[60px] font-gmarket text-[24px] font-medium leading-[32px] text-[#424242]">
          프로필 수정
        </h1>

        <div className="relative mx-auto mt-8 h-[120px] w-[120px]">
          <Image
            src={defaultImageUrl}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7600]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4H8C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6C18 4.89543 17.1046 4 16 4Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M12 8V16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8 12H16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-12 space-y-4">
          <div className="space-y-2">
            <label className="font-gmarket text-[14px] font-normal leading-[20px] text-[#424242]">
              닉네임
            </label>
            <input
              type="text"
              value="마이스토링"
              className="h-[56px] w-full rounded-[4px] border border-[#999E98] px-4 text-[14px] text-[#424242]"
            />
          </div>

          <div className="space-y-2">
            <label className="font-gmarket text-[14px] font-normal leading-[20px] text-[#424242]">
              비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                value="●●●●●●●●●●●●"
                className="h-[56px] w-full rounded-[4px] border border-[#999E98] px-4 text-[14px] text-[#909090]"
                readOnly
              />
              <button className="absolute right-4 top-1/2 flex h-[28px] w-[37px] -translate-y-1/2 items-center justify-center gap-2 rounded-[4px] border border-[#BDBDBD] text-[14px] font-medium text-[#424242]">
                수정
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-14 left-5 right-5 space-y-4">
          <button className="h-[48px] w-full rounded-[4px] border border-[#BDBDBD] text-[16px] font-medium text-[#424242]">
            취소
          </button>
          <button className="h-[48px] w-full rounded-[4px] bg-[#FF7600] text-[16px] font-medium text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageNicknameModal;


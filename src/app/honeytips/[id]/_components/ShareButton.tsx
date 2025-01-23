"use client";

import ShareIcon from "@/assets/images/honeytips/shareIcon.svg";

type ShareButtonProps = {
  url: string;
};

const ShareButton = ({ url }: ShareButtonProps) => {
  const handleShareUrl = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("포스트의 URL이 복사되었습니다.");
      })
      .catch((err) => {
        console.error("URL 복사에 실패했습니다.", err);
      });
  };

  return (
    <button type="button" onClick={handleShareUrl} className="mt-1">
      <ShareIcon />
    </button>
  );
};

export default ShareButton;

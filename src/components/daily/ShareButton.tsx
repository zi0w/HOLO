"use client";

import ShareIcon from "@/assets/images/daily/share.svg";
import { copyToClipboard } from "@/lib/utils/daily/clipboard";
import { useEffect, useRef, useState } from "react";

type ShareButtonProps = {
  postUrl: string;
  title: string;
  description: string;
  thumbnail: string;
};

const ShareButton = ({
  postUrl,
  title,
  description,
  thumbnail,
}: ShareButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 바깥을 클릭하면 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleCopyLink = () => {
    copyToClipboard(postUrl);
    setIsDropdownOpen(false);
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK를 로드할 수 없습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_API_KEY!);
      console.log("Kakao SDK 초기화가 완료되었습니다.");
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `오늘의 추천: ${title}`,
        description,
        imageUrl: thumbnail,
        link: {
          mobileWebUrl: postUrl,
          webUrl: postUrl,
        },
      },
      buttons: [
        {
          title: "결과 보러 가기",
          link: {
            mobileWebUrl: postUrl,
            webUrl: postUrl,
          },
        },
      ],
    });

    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* 공유 버튼 */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2"
      >
        <ShareIcon />
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className="absolute left-1/2 mt-2 w-40 -translate-x-1/2 rounded-lg border border-gray-300 bg-white shadow-lg">
          <button
            onClick={handleCopyLink}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            링크 복사하기
          </button>
          <button
            onClick={handleKakaoShare}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            카카오톡 공유하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;

"use client";

type SocialShareProps = {
  postUrl: string;
  title: string;
  description: string;
  thumbnail: string;
};

const SocialShare = ({
  postUrl,
  title,
  description,
  thumbnail,
}: SocialShareProps) => {
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
        title: `오늘의 추천 메뉴: ${title}`,
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
                webUrl: postUrl
            }
        }
      ]
    });
  };
  return (
    <button onClick={handleKakaoShare}>카카오톡 공유</button>
  )
};

export default SocialShare;

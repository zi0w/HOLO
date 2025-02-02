type Kakao = {
  init: (apiKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (params: {
      objectType: "feed";
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
      buttons: {
        title: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      }[];
    }) => void;
  };
};

declare global {
  interface Window {
    Kakao: Kakao;
  }
}

export {}; // TypeScript에서 모듈로 인식하게 만듦

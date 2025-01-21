// utils/cleanup.ts
export const clearAllStorage = () => {
    // 로컬 스토리지 완전 정리
    localStorage.clear();
    sessionStorage.clear();
  
    // 쿠키 삭제
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };
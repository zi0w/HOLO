//리팩토링 예정
"use client";

import useAuthStore from "@/store/authStore"; // Zustand 스토어 임포트

const DeleteAccount: React.FC = () => {
  const user = useAuthStore((state) => state.user); // 사용자 정보 가져오기
  const clearAuth = useAuthStore((state) => state.clearAuth); // 사용자 제거 함수 가져오기

  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");

    if (!confirmed) return;

    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Accept 헤더 추가
        },
        body: JSON.stringify({ userId: user.id }), // 사용자 ID 전송
      });

      if (!response.ok) {
        const errorData = await response.json();
        window.alert(`회원탈퇴 실패: ${errorData.error}`);
        return;
      }

      const responseData = await response.json();
      window.alert(`회원 탈퇴: ${responseData.message}`);

      // Zustand 스토어에서 사용자 정보 제거
      clearAuth(); // 사용자 정보 제거

      // 로컬스토리지에서 auth-storage 제거
      localStorage.removeItem("auth-storage"); // 특정 키만 삭제
      window.location.href = "/sign-in"; // 로그인페이지 로 리디렉션
    } catch (error) {
      console.error(error);
      window.alert("회원 탈퇴 실패: 오류가 발생했습니다.");
    }
  };

  return (
    <button
      className="w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-black hover:bg-gray-100"
      onClick={handleDeleteAccount} // 회원 탈퇴 처리 함수 호출
    >
      회원 탈퇴
    </button>
  );
};

export default DeleteAccount;

// "use client";

// import useAuthStore from "@/store/authStore"; // Zustand 스토어 임포트

// const DeleteAccount: React.FC = () => {
//   const user = useAuthStore((state) => state.user); // 사용자 정보 가져오기

//   const handleDeleteAccount = async () => {
//     if (!user?.id) return;

//     const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");

//     if (!confirmed) return;

//     try {
//       const response = await fetch("/api/delete-user", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json", // Accept 헤더 추가
//         },
//         body: JSON.stringify({ userId: user.id }), // 사용자 ID 전송
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         window.alert(`회원탈퇴 실패: ${errorData.error}`);
//         return;
//       }

//       const responseData = await response.json();
//       window.alert(`회원 탈퇴: ${responseData.message}`);

//       // 로컬스토리지 데이터 삭제
//       localStorage.clear(); // 로컬스토리지 데이터 삭제
//       window.location.href = "/"; // 홈으로 리디렉션
//     } catch (error) {
//       console.error(error);
//       window.alert("회원 탈퇴 실패: 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <button
//       className="w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-black hover:bg-gray-100"
//       onClick={handleDeleteAccount} // 회원 탈퇴 처리 함수 호출
//     >
//       회원 탈퇴
//     </button>
//   );
// };

// export default DeleteAccount;

// // components/DeleteAccount.tsx
// "use client";

// import Swal from "sweetalert2"; // SweetAlert2 임포트
// import useAuthStore from "@/store/authStore"; // Zustand 스토어 임포트
// import { useSignout } from "@/app/sign-in/_hooks/useSignout"; // 로그아웃 훅 임포트

// const DeleteAccount: React.FC = () => {
//   const user = useAuthStore((state) => state.user); // 사용자 정보 가져오기
//   const { handleLogout } = useSignout(); // 로그아웃 핸들러 가져오기

//   const handleDeleteAccount = async () => {
//     if (!user?.id) return;

//     const result = await Swal.fire({
//       icon: 'warning',
//       title: '정말로 탈퇴하시겠습니까?',
//       showCancelButton: true,
//       confirmButtonColor: '#7EB369',
//       cancelButtonText: '취소',
//       confirmButtonText: '탈퇴',
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response = await fetch('/api/delete-user', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ userId: user.id })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         Swal.fire({
//           icon: 'error',
//           title: '회원탈퇴 실패',
//           text: errorData.error
//         });
//         return;
//       }

//       const responseData = await response.json();
//       Swal.fire({
//         icon: 'success',
//         title: '회원 탈퇴',
//         text: responseData.message
//       });

//       // 로그아웃 및 상태 초기화
//       await handleLogout(); // 로그아웃 처리
//       localStorage.clear(); // 로컬스토리지 데이터 삭제
//       window.location.href = '/'; // 홈으로 리디렉션
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         title: '회원 탈퇴 실패',
//         text: '오류가 발생했습니다.'
//       });
//     }
//   };

//   return (
//     <button 
//       className="w-full rounded-[10px] border border-gray-300 bg-white text-black hover:bg-gray-100 px-4 py-2"
//       onClick={handleDeleteAccount} // 회원 탈퇴 처리 함수 호출
//     >
//       회원 탈퇴
//     </button>
//   );
// };

// export default DeleteAccount;

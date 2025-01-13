import React from "react";

export type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무 것도 렌더링하지 않음

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} // 모달 외부 클릭 이벤트 핸들러 추가
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        style={{ minHeight: "400px" }}
      >
        <h2 className="mb-4 text-center text-xl font-semibold">프로필 수정</h2>

        {/* 동그란 이미지 수정 버튼 */}
        <button className="mx-auto mb-4 block flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200">
          <span className="text-center">📷</span> {/* 아이콘 또는 텍스트 */}
        </button>

        <hr className="mb-4" />
        <div className="flex flex-col space-y-6">
          <h1>닉네임</h1>
          <input
            type="nickname"
            placeholder="닉네임"
            className="rounded border border-gray-300 p-2"
          />
          <h1>비밀번호</h1>
          <input
            type="password"
            placeholder="비밀번호"
            className="rounded border border-gray-300 p-2"
          />
          <h1>비밀번호 확인</h1>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="rounded border border-gray-300 p-2"
          />
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            저장
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;

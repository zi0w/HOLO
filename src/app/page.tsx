"use client"; //TODO: 이후에 지우기

import CompleteModal from "@/components/common/CompleteModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";

const Home = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  return (
    <div>
      <h2 className="common-title">타이틀명</h2>
      <button className="common-btn type-a">common-btn type-a</button>
      <button className="common-btn type-b">common-btn type-b</button>
      <hr />
      <button onClick={() => setIsConfirmModalOpen(true)}>
        삭제 확인 모달창 열기
      </button>
      <ConfirmModal
        children="삭제"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => setIsCompleteModalOpen(true)}
      />
      <hr />
      <button onClick={() => setIsCompleteModalOpen(true)}>
        삭제 완료 모달창 열기
      </button>
      <CompleteModal
        title=""
        children="삭제되었습니다."
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      />
    </div>
  );
};

export default Home;

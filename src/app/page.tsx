"use client";
import MainHeader from "@/components/common/MainHeader";
import Modal from "@/components/common/Modal";
import BestPostList from "@/components/main/BestPostList";
import GuideBnr from "@/components/main/GuideBnr";

import Map from "@/components/main/Map";
import useModalStore from "@/store/modalStore";

const Home = () => {
  const { setModalOpen, setIsConfirm } = useModalStore();
  const handleDelete = async () => {
    try {
      // 삭제등 함수 삽입
      setIsConfirm(false); // 작업 완료 후 완료 모달로 전환
    } catch (error) {
      //에러처리
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setModalOpen(true);
          setIsConfirm(true);
        }}
      >
        삭제 모달
      </button>
      <Modal text="삭제" onAction={handleDelete} />
      <MainHeader />
      <Map />
      {/* 정책 배너 */}
      <GuideBnr isPolicy={true} />
      {/* 쓰레기 배너 */}
      <GuideBnr isPolicy={false} />
      <BestPostList />
    </div>
  );
};

export default Home;

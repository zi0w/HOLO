"use client"; //TODO: 이후에 지우기

import Modal from "@/components/common/Modal";
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
      <h2 className="common-title">타이틀명</h2>
      <button className="common-btn type-a">common-btn type-a</button>
      <button className="common-btn type-b">common-btn type-b</button>
      <hr />
      <button
        onClick={() => {
          setModalOpen(true);
          setIsConfirm(true);
        }}
      >
        삭제 모달
      </button>
      <Modal text="삭제" onAction={handleDelete} />
      <Map />
    </div>
  );
};

export default Home;

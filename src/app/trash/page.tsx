import WasteContainer from "@/app/trash/_components/WasteContainer";

const page = () => {
  return (
    <div>
      <div>
        <h2>쓰레기 가이드</h2>
        <p>우리 동네 쓰레기 배출 일정과 분리배출 정보</p>
      </div>
      <WasteContainer />
    </div>
  );
};

export default page;

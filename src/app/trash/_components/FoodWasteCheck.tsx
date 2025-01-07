const FoodWasteCheck = () => {
  return (
    <div>
      <p>음식물 쓰레기 여부 확인</p>
      <form action="">
        <input
          type="text"
          name=""
          id=""
          placeholder="분류할 쓰레기를 입력해주세요."
        />
        <button type="submit">돋보기</button>
      </form>
      <div>
        <span>#달걀 껍질</span>
        {/* TODO: next/Img 태그쓰기 */}
        <img src="https://via.placeholder.com/220x220" alt="쓰레기사진" /> 
        <p>
          <span>달걀 껍질</span>은(는) 음식물 쓰레기가{" "}
          <strong className="text-red-500">아닙니다!</strong>
        </p>
      </div>
    </div>
  );
};

export default FoodWasteCheck;

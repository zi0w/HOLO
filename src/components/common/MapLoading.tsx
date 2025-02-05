const MapLoading = () => {
  return (
    <>
      <div className="mx-5 flex h-[220px] animate-pulse items-center justify-center rounded-lg bg-gray-200 lg:mx-0 lg:h-[504px]">
        <p className="text-sm text-gray-500">지도를 불러오는 중...</p>
      </div>
      <div className="mx-auto my-4 h-6 w-52 animate-pulse rounded bg-gray-200 lg:mx-auto"></div>
    </>
  );
};

export default MapLoading;

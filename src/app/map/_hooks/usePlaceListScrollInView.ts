import { useEffect, type MutableRefObject } from "react";

const usePlaceListScrollInView = (
  selectedPlace: kakao.maps.services.PlacesSearchResultItem | null,
  places: kakao.maps.services.PlacesSearchResultItem[],
  placeRef: MutableRefObject<(HTMLDivElement | null)[]>,
) => {
  // 마커를 클릭하면 해당 시설 정보로 리스트 스크롤 이동
  useEffect(() => {
    if (selectedPlace) {
      const index = places.findIndex((place) => place.id === selectedPlace.id);
      if (placeRef.current[index]) {
        placeRef.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedPlace]);
};

export default usePlaceListScrollInView;

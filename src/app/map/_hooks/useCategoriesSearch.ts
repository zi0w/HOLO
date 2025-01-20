import type {
  Coordinates,
  Place,
  PlacesSearchResultItem,
} from "@/app/map/_types/map";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const useCategoriesSearch = (mapCenter: Coordinates | null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("맛집"); // 카테고리 선택 상태 관리
  const [places, setPlaces] = useState<PlacesSearchResultItem[]>([]); // 장소 검색 결과 리스트
  const [reSearch, setReSearch] = useState<boolean>(true);
  const [selectedPlace, setSelectedPlace] =
    useState<PlacesSearchResultItem | null>(null);

  const [placeDetail, setPlaceDetail] = useState<Omit<
    Place,
    "place_id" | "x" | "y" | "road_address_name"
  > | null>(null);

  // 선택한 마커 장소 상세정보 가져오기
  const getPlaceDetail = async (placeName: string) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(placeName)}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("장소 정보를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      const result = data.documents[0];
      if (result) {
        setPlaceDetail(result);
      } else {
        alert("장소 정보를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("장소 정보 요청에 실패하였습니다.", error);
      alert("장소 정보 요청에 실패하였습니다.");
    }
  };

  // 마커를 클릭했을 때, 장소 정보를 가져옮
  const onClickMarker = (place: PlacesSearchResultItem) => {
    setSelectedPlace(place);
    getPlaceDetail(place.place_name);
  };

  // mapCenter가 변경될 때마다 places를 업데이트하는 함수
  const searchPlaces = () => {
    if (!window.kakao || !window.kakao.maps) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      category,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(result);
        } else {
          setPlaces([]);
          if (result.length === 0) {
            alert("근처에 해당 시설이 없습니다.");
          }
        }
        setReSearch(false);
      },
      {
        location: new kakao.maps.LatLng(mapCenter!.lat, mapCenter!.lng),
        radius: 1500,
      },
    );
  };

  // 카카오맵 SDK 로드 확인
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        setIsLoading(true);
        searchPlaces(); // SDK 로드 완료 시 검색 실행
      }
    };

    if (window.kakao && window.kakao.maps) {
      setIsLoading(true);
      searchPlaces(); // 이미 로드되어 있다면 바로 검색 실행
    } else {
      window.addEventListener("load", loadKakaoMap);
    }

    return () => {
      window.removeEventListener("load", loadKakaoMap);
    };
  }, []);

  // 카테고리나 맵 센터가 변경될 때 검색 실행
  useEffect(() => {
    if (isLoading && reSearch) {
      searchPlaces();
    }
  }, [category, isLoading, reSearch]);

  // 카테고리 변경 시 검색 트리거
  const handleCategoryChange: Dispatch<SetStateAction<string>> = useCallback(
    (newValue) => {
      const newCategory =
        typeof newValue === "function" ? newValue(category) : newValue;
      setCategory(newCategory);
      setReSearch(true);
    },
    [category],
  );

  // 검색 버튼 클릭 핸들러
  const onClickReSearch = () => {
    setReSearch(true);
  };

  return {
    setCategory: handleCategoryChange,
    places,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
    category,
    onClickReSearch,
  };
};
export default useCategoriesSearch;

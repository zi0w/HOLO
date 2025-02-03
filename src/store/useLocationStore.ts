import type { Coordinates, PlacesSearchResultItem } from "@/app/map/_types/map";
import type { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

type MapStore = {
  currentPosition: Coordinates | null;
  mapCenter: Coordinates;
  mapLevel: number;
  geolocationError: string | null;
  kakaoLoading: boolean;
  selectedPlace: PlacesSearchResultItem | null;
  setKakaoLoading: (loading: boolean) => void;
  setCurrentPosition: (position: Coordinates | null) => void;
  setMapCenter: (center: Coordinates) => void;
  setMapLevel: (level: number) => void;
  setGeolocationError: (error: string | null) => void;
  onClickPlusMapLevel: () => void;
  onClickMinusMapLevel: () => void;
  onClickMoveCurrentPosition: () => void;
  setSelectedPlace: Dispatch<SetStateAction<PlacesSearchResultItem | null>>;
};
const useLocationStore = create<MapStore>((set) => ({
  currentPosition: null,
  mapCenter: {
    lat: 37.56675214138411,
    lng: 126.97875415079992,
  },
  mapLevel: 5,
  geolocationError: null,
  kakaoLoading: true,
  selectedPlace: null,
  
  setKakaoLoading: (loading) =>
    set((state) => {
      if (state.kakaoLoading !== loading) {
        return { kakaoLoading: loading };
      }
      return state; // 상태가 동일하면 업데이트하지 않음
    }),
  setCurrentPosition: (position) => set({ currentPosition: position }),
  setMapCenter: (center) => set({ mapCenter: center }),
  setMapLevel: (level) => set({ mapLevel: level }),
  setGeolocationError: (error) => set({ geolocationError: error }),

  onClickPlusMapLevel: () =>
    set((state) => ({ mapLevel: Math.max(state.mapLevel - 1, 1) })),

  onClickMinusMapLevel: () =>
    set((state) => ({ mapLevel: Math.min(state.mapLevel + 1, 14) })),

  onClickMoveCurrentPosition: () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          set({
            currentPosition: newPosition,
            mapCenter: newPosition,
            geolocationError: null,
          });
        },
        (error) => {
          console.error("위치를 가져올 수 없습니다.\n", error.message);
          set({ geolocationError: "위치 허용 여부를 확인해주세요." });
        },
        options,
      );
    } else {
      set({
        geolocationError: "위치 허용 여부를 확인해주세요.",
      });
    }
  },
  setSelectedPlace: (place) =>
    set((state) => ({
      selectedPlace:
        typeof place === "function" ? place(state.selectedPlace) : place,
    })),
}));

export default useLocationStore;

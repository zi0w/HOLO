import type { Coordinates } from "@/app/map/_types/map";
import { create } from "zustand";

type MapStore = {
  currentPosition: Coordinates | null;
  mapCenter: Coordinates;
  mapLevel: number;
  geolocationError: string | null;

  setCurrentPosition: (position: Coordinates | null) => void;
  setMapCenter: (center: Coordinates) => void;
  setMapLevel: (level: number) => void;
  setGeolocationError: (error: string | null) => void;
  onClickPlusMapLevel: () => void;
  onClickMinusMapLevel: () => void;
  onClickMoveCurrentPosition: () => void;
};
const locationStore = create<MapStore>((set) => ({
  currentPosition: null,
  mapCenter: {
    lat: 37.56675214138411,
    lng: 126.97875415079992,
  },
  mapLevel: 5,
  geolocationError: null,

  setCurrentPosition: (position) => set({ currentPosition: position }),
  setMapCenter: (center) => set({ mapCenter: center }),
  setMapLevel: (level) => set({ mapLevel: level }),
  setGeolocationError: (error) => set({ geolocationError: error }),
  onClickPlusMapLevel:()=>set((state)=>({mapLevel:Math.max(state.mapLevel -1, 1)})),
  onClickMinusMapLevel:()=>set((state)=>({mapLevel:Math.min(state.mapLevel + 1, 14)})),
  onClickMoveCurrentPosition:()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const {latitude,longitude} = position.coords;
                const newPosition = {lat:latitude, lng: longitude};
                set({
                    currentPosition: newPosition,
                    mapCenter:newPosition,
                })
            },
            (error)=>{
                console.error("위치를 가져올 수 없습니다.",error.message);
                set({geolocationError:error.message})
            }
        );
    }else
  }
}));

export default locationStore;

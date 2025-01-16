import Bank from "@/assets/images/map/bank.svg";
import {
  default as Cafe,
  default as Restaurant,
} from "@/assets/images/map/cafe.svg";
import Daiso from "@/assets/images/map/daiso.svg";
import Fitness from "@/assets/images/map/fitness.svg";
import Hospital from "@/assets/images/map/hospital.svg";
import Laundry from "@/assets/images/map/Laundry.svg";
import Pharmacy from "@/assets/images/map/pharmacy.svg";
import Salon from "@/assets/images/map/salon.svg";
import Welfare from "@/assets/images/map/welfare.svg";

export const MAP_CATEGORIES = [
  { id: 0, name: "맛집", img: Restaurant },
  { id: 1, name: "카페", img: Cafe },
  { id: 2, name: "다이소", img: Daiso },
  { id: 3, name: "미용실", img: Salon },
  { id: 4, name: "병원", img: Hospital },
  { id: 5, name: "약국", img: Pharmacy },
  { id: 6, name: "세탁소", img: Laundry },
  { id: 7, name: "행정복지센터", img: Welfare },
  { id: 8, name: "헬스장", img: Fitness },
  { id: 9, name: "은행", img: Bank },
];

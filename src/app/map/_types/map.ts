export type Coordinates = {
    lat: number;
    lng: number;
  };

  export type Place = {
    id: string;
    place_name: string;
    address_name: string;
    phone?: string;
    x: string; // 경도
    y: string; // 위도
    opening_hours?: string[];
    category_name: string;
    place_url: string;
    road_address_name: string;
  };
  
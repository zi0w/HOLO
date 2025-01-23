import districtData from "@/app/policy/_data/district.json";

type DistrictData = {
  [key: string]: string[];
};

const isDistrictData = (data: unknown): data is DistrictData[] => {
  return (
    Array.isArray(data) &&
    data.every((item) => {
      return (
        typeof item === "object" &&
        item !== null &&
        Object.keys(item).length === 1 &&
        Array.isArray(Object(item)[Object.keys(item)[0]])
      );
    })
  );
};

const districts = isDistrictData(districtData) ? districtData : [];

export const REGIONS = [
  ...districts.map((item, index) => {
    const region = Object.keys(item)[0];
    return {
      id: index + 1,
      code: region,
      name: region,
    };
  }),
];

export const REGION_CODES: { [key: string]: string } = {
  서울특별시: "003002001",
  부산광역시: "003002002",
  대구광역시: "003002003",
  인천광역시: "003002004",
  광주광역시: "003002005",
  대전광역시: "003002006",
  울산광역시: "003002007",
  경기도: "003002008",
  강원특별자치도: "003002009",
  충청북도: "003002010",
  충청남도: "003002011",
  전북특별자치도: "003002012",
  전라남도: "003002013",
  경상북도: "003002014",
  경상남도: "003002015",
  제주특별자치도: "003002016",
  세종특별자치시: "003002017",
};

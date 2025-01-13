import type { RegionData } from "@/app/trash-guide/_types/day";
import { useQuery } from "@tanstack/react-query";
import { type ChangeEvent } from "react";

type RegionSelectProps = {
  selectedRegion: string;
  onChange: (region: string, districts: string[]) => void;
};

const fetchRegionData = async (): Promise<RegionData[]> => {
  const response = await fetch("data/district.json");
  return response.json();
};

const RegionSelect = ({ selectedRegion, onChange }: RegionSelectProps) => {
  const {
    data: regionData,
    isPending,
    error,
  } = useQuery<RegionData[]>({
    queryKey: ["regionData"],
    queryFn: fetchRegionData,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const districts =
      regionData?.find((region) => Object.keys(region)[0] === selected)?.[
        selected
      ] || [];
    onChange(selected, districts);
  };

  if (isPending) return <div>지역 데이터 로딩중</div>; // TODO: 로딩 바꾸기
  if (error instanceof Error) return <div>에러: {error.message}</div>; // TODO: 에러처리 바꾸기

  return (
    <select
      name="region"
      id="region"
      className="border border-yellow-500"
      onChange={handleChange}
      value={selectedRegion}
    >
      <option value="지역선택">지역선택</option>
      {regionData?.map((region, i) => (
        <option value={Object.keys(region)[0]} key={i}>
          {Object.keys(region)[0]}
        </option>
      ))}
    </select>
  );
};

export default RegionSelect;

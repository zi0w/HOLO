import type { RegionData } from "@/app/trash-guide/_types/trashTypes";
import LoadingSmall from "@/components/common/LoadingSmall";
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

  if (isPending) return <LoadingSmall />;
  if (error instanceof Error) return <div>에러: {error.message}</div>;

  return (
    <select
      name="region"
      id="region"
      className="common-select"
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

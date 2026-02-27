import CustomSelect from "@/app/policy/_components/CustomSelect";
import { POLICY_CATEGORIES } from "@/app/policy/_constants/policy";
import districtData from "@/app/policy/_data/district.json";

type DistrictData = {
  [key: string]: string[];
};

type PolicyFilterProps = {
  regionSelected: string;
  fieldSelected: string;
  onRegionChange: (region: string) => void;
  onFieldChange: (field: string) => void;
  onSearch: () => void;
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

const REGIONS = [
  ...districts.map((item, index) => {
    const region = Object.keys(item)[0];
    return {
      id: index + 1,
      code: region,
      name: region,
    };
  }),
];

const PolicyFilter = ({
  regionSelected,
  fieldSelected,
  onRegionChange,
  onFieldChange,
  onSearch,
}: PolicyFilterProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <CustomSelect
          options={REGIONS}
          selectedValue={regionSelected}
          onChange={onRegionChange}
          placeholder="지역 선택"
        />
        <CustomSelect
          options={POLICY_CATEGORIES}
          selectedValue={fieldSelected}
          onChange={onFieldChange}
          placeholder="정책 분야 선택"
        />
      </div>
      <button type="button" onClick={onSearch} className="lookup-btn">
        조회
      </button>
    </div>
  );
};

export default PolicyFilter;

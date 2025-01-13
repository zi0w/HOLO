import { POLICY_CATEGORIES } from "@/app/policy/_constants/policy";
import RegionSelect from "@/components/common/RegionSelect";
import clsx from "clsx";

type PolicyFilterProps = {
  regionSelected: string;
  fieldSelected: string;
  onRegionChange: (region: string) => void;
  onFieldChange: (field: string) => void;
  onSearch: () => void;
};

const PolicyFilter = ({
  regionSelected,
  fieldSelected,
  onRegionChange,
  onFieldChange,
  onSearch,
}: PolicyFilterProps) => {
  const isDisabled =
    !regionSelected ||
    regionSelected === "지역선택" ||
    !fieldSelected ||
    fieldSelected === "선택";

  return (
    <div>
      {/* 지역 셀렉박스 */}
      <RegionSelect selectedRegion={regionSelected} onChange={onRegionChange} />
      {/* 분야 셀렉박스 */}
      <select
        name="field"
        id="field"
        className="border border-yellow-500"
        onChange={(e) => onFieldChange(e.target.value)}
        value={fieldSelected}
      >
        <option value="선택">정책 분야 선택</option>
        {POLICY_CATEGORIES.map((field) => (
          <option key={field.id} value={field.code}>
            {field.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onSearch}
        className={clsx(isDisabled ? "bg-gray-500" : "bg-yellow-500")}
        disabled={isDisabled}
      >
        조회
      </button>
    </div>
  );
};

export default PolicyFilter;

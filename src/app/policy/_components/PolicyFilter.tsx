import CustomSelect from "@/app/policy/_components/CustomSelect";
import { POLICY_CATEGORIES } from "@/app/policy/_constants/policy";
import { REGIONS } from "@/app/policy/_constants/region";

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
  const isDisabled = !regionSelected || !fieldSelected;

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
      <button
        type="button"
        onClick={onSearch}
        className="lookup-btn"
        disabled={isDisabled}
      >
        조회
      </button>
    </div>
  );
};

export default PolicyFilter;

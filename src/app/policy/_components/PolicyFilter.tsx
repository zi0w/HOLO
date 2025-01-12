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

  const fieldCont = [
    { id: 0, name: "일자리 분야", code: "023010" },
    { id: 1, name: "주거 분야", code: "023020" },
    { id: 2, name: "교육 분야", code: "023030" },
    { id: 3, name: "복지.문화 분야", code: "023040" },
    { id: 4, name: "참여, 권리 분야", code: "023050" },
  ];

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
        {fieldCont.map((field) => (
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

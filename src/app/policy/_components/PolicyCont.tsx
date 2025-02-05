"use client";

import { fetchPolicyList } from "@/app/policy/_actions/fetchPolicyList";
import PolicyFilter from "@/app/policy/_components/PolicyFilter";
import PolicyResult from "@/app/policy/_components/PolicyResult";
import { REGION_CODES } from "@/app/policy/_constants/region";
import type { PolicyData } from "@/app/policy/_types/policy";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type SearchFilters = {
  region: string;
  field: string;
};

const PolicyCont = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    region: "지역 선택",
    field: "정책 분야 선택",
  });

  const {
    data: policyData,
    isLoading,
    error,
    refetch,
  } = useQuery<PolicyData[]>({
    queryKey: ["policies"],
    queryFn: async () => {
      const regionCode = REGION_CODES[filters.region];
      const response = await fetchPolicyList({
        bizTycdSel: filters.field,
        srchPolyBizSecd: regionCode,
      });
      return response as PolicyData[];
    },
    enabled: shouldFetch && !!filters.region && !!filters.field,
  });

  const {
    currentItems: currentPolicyData,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination<PolicyData>(policyData || [], 6);

  const handleFilterChange = (
    key: keyof Omit<SearchFilters, "pageIndex">,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    setIsRefetching(true);
    setShouldFetch(true);
    await refetch();
    setIsRefetching(false);
  };

  return (
    <div>
      <PolicyFilter
        regionSelected={filters.region}
        fieldSelected={filters.field}
        onRegionChange={(region) => handleFilterChange("region", region)}
        onFieldChange={(field) => handleFilterChange("field", field)}
        onSearch={handleSearch}
      />
      {isLoading || isRefetching ? (
        <Loading />
      ) : (
        <>
          <p className="mb-4 mt-5 break-keep text-sm text-base-800 [text-rendering:optimizeLegibility]">
            현재 청년 정책 정보를 제공하는 API가 사정상 2월까지 일시적으로
            중단됩니다. <br />
            이용에 불편을 드려 죄송하며, 빠르게 복구하도록 노력하겠습니다.
          </p>

          {/* TODO */}
          <div className="hidden">
            <PolicyResult error={error} policyData={currentPolicyData} />
            {policyData && policyData.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                startButtonIndex={startButtonIndex}
                maxButtonsToShow={maxButtonsToShow}
                onNextPage={nextPage}
                onPrevPage={prevPage}
                onGoToPage={goToPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PolicyCont;

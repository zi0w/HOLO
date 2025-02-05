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
        </>
      )}
    </div>
  );
};

export default PolicyCont;

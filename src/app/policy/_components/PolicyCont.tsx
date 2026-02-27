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
  const [filters, setFilters] = useState<SearchFilters>({
    region: "서울특별시",
    field: "주거",
  });

  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    region: "서울특별시",
    field: "주거",
  });

  const {
    data: policyData,
    isFetching,
    error,
    refetch,
  } = useQuery<PolicyData["result"]["youthPolicyList"]>({
    queryKey: ["policies", appliedFilters.region, appliedFilters.field],
    queryFn: async () => {
      const regionCode = REGION_CODES[appliedFilters.region];
      const response: PolicyData = await fetchPolicyList({
        zipCd: regionCode,
        lclsfNm: appliedFilters.field,
        pageSize: "1000",
      });
      return response.result.youthPolicyList;
    },
    enabled: false,
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
  } = usePagination<PolicyData["result"]["youthPolicyList"][0]>(
    policyData || [],
    6,
  );

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    if (
      appliedFilters.region === filters.region &&
      appliedFilters.field === filters.field
    ) {
      return;
    }

    setAppliedFilters(filters);

    setTimeout(() => {
      refetch();
    }, 0);
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

      {isFetching ? (
        <Loading />
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default PolicyCont;

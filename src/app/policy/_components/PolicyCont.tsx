"use client";

import { fetchPolicyList } from "@/app/policy/_actions/fetchPolicyList";
import PolicyFilter from "@/app/policy/_components/PolicyFilter";
import PolicyResult from "@/app/policy/_components/PolicyResult";
import { REGION_CODES } from "@/app/policy/_constants/region";
import type { PolicyData } from "@/app/policy/_types/policy";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import { useSuspenseQuery } from "@tanstack/react-query";
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
  const [loading, setLoading] = useState(false);

  const {
    data: policyData,
    isPending,
    error,
    refetch,
  } = useSuspenseQuery<PolicyData["result"]["youthPolicyList"]>({
    queryKey: ["policies"],
    queryFn: async () => {
      const regionCode = REGION_CODES[filters.region];
      const response: PolicyData = await fetchPolicyList({
        zipCd: regionCode,
        lclsfNm: filters.field,
        pageSize: "1000",
      });
      return response.result.youthPolicyList;
    },
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

  const handleFilterChange = (
    key: keyof Omit<SearchFilters, "pageNum">,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
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
      {isPending || loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default PolicyCont;

"use client";

import { getPolicies } from "@/app/policy/_actions/getPolicies";
import PolicyFilter from "@/app/policy/_components/PolicyFilter";
import PolicyResult from "@/app/policy/_components/PolicyResult";
import { REGION_CODES } from "@/app/policy/_constants/region";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type SearchFilters = {
  region: string;
  field: string;
};

const PolicyCont = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    region: "",
    field: "",
  });
  const [page, setPage] = useState<number>(1);

  const {
    data: policyData,
    isLoading: isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["policies", filters.region, filters.field],
    queryFn: async () => {
      const regionCode = REGION_CODES[filters.region];
      return getPolicies({
        polyRlmCd: filters.field,
        srchPolyBizSecd: regionCode,
      });
    },
    enabled: false,
    initialData: null,
  });

  const handleFilterChange = (
    key: keyof Omit<SearchFilters, "pageIndex">,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <PolicyFilter
        regionSelected={filters.region}
        fieldSelected={filters.field}
        onRegionChange={(region) => handleFilterChange("region", region)}
        onFieldChange={(field) => handleFilterChange("field", field)}
        onSearch={() => refetch()}
      />
      <PolicyResult
        error={error}
        isPending={isPending}
        policyData={policyData}
      />
      {/* <PolicyPagination page={page} setPage={setPage} totalPages={totalPages} /> */}
    </div>
  );
};

export default PolicyCont;

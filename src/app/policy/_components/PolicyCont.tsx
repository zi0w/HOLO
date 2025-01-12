"use client";

import PolicyFilter from "@/app/policy/_components/PolicyFilter";
import PolicyResult from "@/app/policy/_components/PolicyResult";
import type { PolicyData } from "@/app/policy/_types/policy";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PolicyCont = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [regionSelected, setRegionSelected] = useState<string>("");
  const [fieldSelected, setFieldSelected] = useState<string>("");
  const [policyData, setPolicyData] = useState<PolicyData[] | null>(null);

  const handleRegionChange = (region: string) => {
    setRegionSelected(region);
  };

  const handleFieldChange = (field: string) => {
    setFieldSelected(field);
  };

  const regionCodeMap: { [key: string]: string } = {
    서울특별시: "003002001",
    부산광역시: "003002002",
    대구광역시: "003002003",
    인천광역시: "003002004",
    광주광역시: "003002005",
    대전광역시: "003002006",
    울산광역시: "003002007",
    경기도: "003002008",
    강원특별자치도: "003002009",
    충청북도: "003002010",
    충청남도: "003002011",
    전북특별자치도: "003002012",
    전라남도: "003002013",
    경상북도: "003002014",
    경상남도: "003002015",
    제주특별자치도: "003002016",
    세종특별자치시: "003002017",
  };

  const fetchPolicyData = async () => {
    const regionCode = regionCodeMap[regionSelected];
    const params = new URLSearchParams({
      pageIndex: pageIndex.toString(),
      polyRlmCd: fieldSelected, // 정책 분야 코드
      srchPolyBizSecd: regionCode, // 지역 코드
    });

    const policyListResponse = await fetch(`/api/policy?${params}`);
    if (!policyListResponse.ok) {
      throw new Error("청년 정책 데이터를 불러오는 중 오류가 발생했습니다.");
    }
    return policyListResponse.json();
  };

  const { isFetching, error, refetch } = useQuery<PolicyData[]>({
    queryKey: ["policySearchResults", regionSelected, fieldSelected, pageIndex],
    queryFn: fetchPolicyData,
    enabled: false,
  });

  const handleClick = async () => {
    const policyResult = await refetch();
    if (policyResult.data) {
      setPolicyData(policyResult.data);
    }
  };

  return (
    <div>
      <PolicyFilter
        regionSelected={regionSelected}
        fieldSelected={fieldSelected}
        onRegionChange={handleRegionChange}
        onFieldChange={handleFieldChange}
        onSearch={handleClick}
      />

      {/* start : Result */}
      <PolicyResult
        error={error}
        isFetching={isFetching}
        policyData={policyData}
      />
    </div>
  );
};

export default PolicyCont;

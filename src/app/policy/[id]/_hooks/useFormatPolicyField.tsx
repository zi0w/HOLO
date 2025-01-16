import type { PolicyData } from "@/app/policy/_types/policy";
import Link from "next/link";
import { useMemo } from "react";

const useFormatPolicyField = (policyInfo: PolicyData) => {
  return useMemo(() => {
    return (fieldName: keyof PolicyData) => {
      const policyData = policyInfo[fieldName];

      if (!policyData || policyData === "null") {
        return "정보가 없습니다.";
      }

      if (fieldName === "rqutPrdCn") {
        const dateRanges = (policyData as string).split("\r");
        return dateRanges[dateRanges.length - 1];
      }

      return policyData;
    };
  }, [policyInfo]);
};

export default useFormatPolicyField;

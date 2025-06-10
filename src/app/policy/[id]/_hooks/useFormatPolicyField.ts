/* eslint-disable react/display-name */
import type { PolicyData } from "@/app/policy/_types/policy";
import { useMemo } from "react";

const useFormatPolicyField = (policyInfo: PolicyData) => {
  return useMemo(() => {
    return (fieldName: keyof PolicyData["result"]["youthPolicyList"][0]) => {
      const policyData = policyInfo.result.youthPolicyList[0][fieldName];

      if (!policyData || policyData === "null") {
        return "정보가 없습니다.";
      }

      if (fieldName === "plcyAplyMthdCn") {
        const dateRanges = policyData.split("\r");
        return dateRanges[dateRanges.length - 1];
      }

      if (fieldName === "aplyUrlAddr" || fieldName === "refUrlAddr1") {
        return policyData;
      }

      return policyData;
    };
  }, [policyInfo]);
};

export default useFormatPolicyField;

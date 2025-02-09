/* eslint-disable react/display-name */
import type { PolicyData } from "@/app/policy/_types/policy";
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

      if (fieldName === "rqutUrla" || fieldName === "rfcSiteUrla1") {
        return policyData;
        // <Link
        //   href={policyData as string}
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   className="break-words text-link underline"
        // >
        //   {policyData}
        // </Link>
      }

      return policyData;
    };
  }, [policyInfo]);
};

export default useFormatPolicyField;

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

      if (fieldName === "rqutUrla" || fieldName === "rfcSiteUrla1") {
        return (
          <Link
            href={policyData as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            신청하러 가기
          </Link>
        );
      }

      return policyData;
    };
  }, [policyInfo]);
};

export default useFormatPolicyField;

"use client";

import useFormatPolicyField from "@/app/policy/[id]/_hooks/useFormatPolicyField";
import type { PolicyData } from "@/app/policy/_types/policy";

type PolicyDetailItemProps = {
  fieldName: string;
  displayName: string;
  policyInfo: PolicyData;
};

const PolicyDetailItem = ({
  fieldName,
  displayName,
  policyInfo,
}: PolicyDetailItemProps) => {
  const formatPolicyField = useFormatPolicyField(policyInfo);

  return (
    <li
      key={fieldName}
      className="flex flex-col gap-1 break-keep text-base-700"
    >
      <strong className="text-xs">{displayName}</strong>
      <p className="text-sm">
        {formatPolicyField(fieldName as keyof PolicyData)}
      </p>
    </li>
  );
};

export default PolicyDetailItem;

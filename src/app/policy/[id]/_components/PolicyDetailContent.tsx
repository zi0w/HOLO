import useFormatPolicyField from "@/app/policy/[id]/_hooks/useFormatPolicyField";
import { POLICY_DISPLAY_NAMES } from "@/app/policy/_constants/policy";
import type { PolicyData } from "@/app/policy/_types/policy";

const PolicyDetailContent = ({ policyInfo }: { policyInfo: PolicyData }) => {
  const formatPolicyField = useFormatPolicyField(policyInfo);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center text-2xl font-bold">
        {policyInfo.polyBizSjnm}
      </h2>
      <ul className="space-y-4">
        {Object.entries(POLICY_DISPLAY_NAMES).map(
          ([fieldName, displayName]) => (
            <li key={fieldName} className="flex flex-col md:flex-row md:gap-5">
              <strong className="whitespace-nowrap">{displayName}</strong>
              <p className="break-keep">
                {formatPolicyField(fieldName as keyof PolicyData)}
              </p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default PolicyDetailContent;

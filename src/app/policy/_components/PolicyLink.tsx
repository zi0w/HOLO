import type { PolicyData } from "@/app/policy/_types/policy";
import Link from "next/link";

const PolicyLink = ({
  policy,
  onClick,
}: {
  policy: PolicyData["result"]["youthPolicyList"][0];
  onClick: (e: React.MouseEvent, plcyNo: string) => void;
}) => {
  return (
    <Link
      key={policy.plcyNo}
      href={`/policy/${policy.plcyNo}`}
      className="block cursor-pointer rounded border-b border-base-300 px-3 py-2 text-base-800 transition-colors duration-200 hover:bg-primary-50"
      onClick={(e) => onClick(e, policy.plcyNo)}
    >
      {policy.plcyNm}
    </Link>
  );
};

export default PolicyLink;

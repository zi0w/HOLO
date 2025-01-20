import type { PolicyData } from "@/app/policy/_types/policy";
import Link from "next/link";

const PolicyLink = ({
  policy,
  onClick,
}: {
  policy: PolicyData;
  onClick: (e: React.MouseEvent, bizId: string) => void;
}) => {
  return (
    <Link
      key={policy.bizId}
      href={`/policy/${policy.bizId}`}
      className="block cursor-pointer rounded border-b border-base-300 px-3 py-2 transition-colors duration-200 text-base-800 hover:bg-primary-50"
      onClick={(e) => onClick(e, policy.bizId)}
    >
      {policy.polyBizSjnm}
    </Link>
  );
};

export default PolicyLink;

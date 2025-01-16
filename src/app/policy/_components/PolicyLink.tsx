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
      className="cursor-pointer rounded border border-primary-200 px-3 py-2 hover:bg-primary-50 transition-colors duration-150"
      onClick={(e) => onClick(e, policy.bizId)}
    >
      {policy.polyBizSjnm}
    </Link>
  );
};

export default PolicyLink;

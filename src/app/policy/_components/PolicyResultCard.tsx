import type { PolicyData } from "@/app/policy/_types/policy";
import Link from "next/link";

const PolicyResultCard = ({ policy }: { policy: PolicyData }) => {
  return (
    <Link
      href={`/policy/${policy.bizId}`}
      key={policy.bizId}
      className="cursor-pointer rounded-lg border p-4 hover:bg-gray-50"
    >
      <h3>{policy.polyBizSjnm}</h3>
    </Link>
  );
};

export default PolicyResultCard;

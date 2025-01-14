"use client";

import type { PolicyData } from "@/app/policy/_types/policy";
import Link from "next/link";
import { useRouter } from "next/navigation";
type policyResultType = {
  policy: PolicyData;
  setIsLoadingPage: (value: boolean) => void;
};

const PolicyResultCard = ({
  policy,
  setIsLoadingPage,
}: policyResultType) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoadingPage(true);
    router.push(`/policy/${policy.bizId}`);
  };

  return (
    <Link
      href={`/policy/${policy.bizId}`}
      onClick={handleClick}
      key={policy.bizId}
      className="cursor-pointer rounded-lg border p-4 hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <p>{policy.polyBizSjnm}</p>
      </div>
    </Link>
  );
};

export default PolicyResultCard;

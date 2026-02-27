"use client";

import Link from "next/link";

type PolicyDetailItemProps = {
  fieldName: string;
  displayName: string;
  value?: string;
};

const PolicyDetailItem = ({
  fieldName,
  displayName,
  value,
}: PolicyDetailItemProps) => {
  const isUrl = value?.includes("http");
  const displayValue = value?.trim() === "" || value === null ? "-" : value;

  return (
    <li
      key={fieldName}
      className="flex flex-col gap-1 break-keep text-base-700"
    >
      <strong className="text-xs">{displayName}</strong>
      {isUrl ? (
        <Link
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-link underline"
        >
          {displayValue}
        </Link>
      ) : (
        <p className="text-sm">{displayValue}</p>
      )}
    </li>
  );
};

export default PolicyDetailItem;

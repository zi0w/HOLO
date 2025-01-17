import Link from "next/link";

type DropdownButtonProps = {
  label: string;
  onClick?: () => void;
  href?: string;
};

const DropdownButton = ({ label, onClick, href }: DropdownButtonProps) => {
  const baseStyles =
    "block w-[68px] px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500";

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {label}
      </Link>
    );
  }

  return (
    <button className={baseStyles} onClick={onClick}>
      {label}
    </button>
  );
};

export default DropdownButton;

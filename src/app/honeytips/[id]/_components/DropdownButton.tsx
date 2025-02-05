import Link from "next/link";

type DropdownButtonProps = {
  label: string;
  onClick?: () => void;
  href?: string;
};

const DropdownButton = ({ label, onClick, href }: DropdownButtonProps) => {
  const baseStyles =
    "block w-[68px] px-5 py-2 text-center text-sm text-base-700 hover:bg-primary-50 hover:text-primary-900";

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {label}
      </Link>
    );
  }

  return (
    <button
      id="dropdown-button"
      type="button"
      aria-label="드롭다운 메뉴"
      className={baseStyles}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default DropdownButton;

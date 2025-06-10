import { useState } from "react";

export const useDropdown = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  return {
    isDropdownOpen: (id: string) => openDropdownId === id,
    toggleDropdown,
    closeDropdown,
  };
};

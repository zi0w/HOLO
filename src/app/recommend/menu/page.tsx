import dynamic from "next/dynamic";

const SelectForms = dynamic(() => import("@/app/recommend/_components/SelectForms"))

const MenuPage = () => {
  return <SelectForms />;
};
export default MenuPage;

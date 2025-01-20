import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SelectForms = dynamic(() => import("@/app/recommend/_components/SelectForms"))

export const metadata: Metadata = {
  title: "오늘의 메뉴 추천",
  description:
    "무엇을 먹을지 고민이라면? 간단한 4문제로 메뉴를 골라볼까요?",
  openGraph: {
    title: "오늘의 메뉴 추천",
    description:
      "무엇을 먹을지 고민이라면? 간단한 4문제로 메뉴를 골라볼까요?",
    url: "https://localhost:3000/recommend/menu",
  },
};

const MenuPage = () => {
  return <SelectForms />;
};
export default MenuPage;

export const POLICY_CATEGORIES = [
  { id: 0, name: "주거", code: "주거" },
  { id: 1, name: "참여권리", code: "참여권리" },
  { id: 2, name: "복지문화", code: "복지문화" },
  { id: 3, name: "일자리", code: "일자리" },
];
export const POLICY_DISPLAY_NAMES = {
  sprvsnInstCdNm: "운영기관명",
  plcyExplnCn: "정책 소개",
  plcySprtCn: "지원 내용",
  bizPrdBgngYmd: "사업 기간 시작 일자",
  bizPrdEndYmd: "사업 기간 종료 일자",
  plcyAplyMthdCn: "신청 절차",
  aplyUrlAddr: "신청 사이트 주소",
  refUrlAddr1: "참고 사이트",
} as const;

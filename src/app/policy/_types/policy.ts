export type PolicyData = {
  result: {
    youthPolicyList: {
      plcyNo: string; // 정책 번호
      plcyNm: string; // 정책명
      sprvsnInstCdNm: string; // 운영기관명
      plcyExplnCn: string; // 정책소개
      plcySprtCn: string; // 지원내용
      bizPrdBgngYmd: string; // 사업기간시작일자
      bizPrdEndYmd: string; // 사업기간종료일자
      plcyAplyMthdCn: string; // 신청절차내용
      aplyUrlAddr: string; // 신청사이트주소
      refUrlAddr1?: string; // 참고사이트
    }[];
  };
};

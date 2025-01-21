import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export const formatDate = (createdAt: string) => {
  const createdDate = dayjs(createdAt, "YYYY-MM-DDTHH:mm:ssZ").tz("Asia/Seoul");
  const now = dayjs().tz("Asia/Seoul");

  if (now.diff(createdDate, "minute") < 1) return "방금 전";
  if (now.diff(createdDate, "minute") < 60)
    return `${now.diff(createdDate, "minute")}분 전`;
  if (now.diff(createdDate, "hour") < 24)
    return `${now.diff(createdDate, "hour")}시간 전`;

  return createdDate.format("YYYY.MM.DD");
};

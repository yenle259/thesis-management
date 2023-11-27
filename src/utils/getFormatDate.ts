import { DATE_FORMAT_STRING, DATE_FORMAT_STRING_TIME2RD } from "@/constant";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function getFormatDate(date: Date) {
  return format(date, DATE_FORMAT_STRING);
}

export function getFormatDatetime(date: Date) {
  return format(date, DATE_FORMAT_STRING_TIME2RD);
}

export function dateViFormat(date: any, isLong?: boolean) {
  const formatStr = isLong ? "hh:mm PPPP" : "hh:mm PPP";
  return format(new Date(date), formatStr, { locale: vi });
}

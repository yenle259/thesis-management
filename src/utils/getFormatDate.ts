import { DATE_FORMAT_STRING } from "@/constant";
import { format } from "date-fns";

export function getFormatDate(date: Date) {
  return format(date, DATE_FORMAT_STRING);
}

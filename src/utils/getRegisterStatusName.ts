import { RegisterReportEnum } from "@/apis/models/RegisterReportEnum";

type Status = RegisterReportEnum;

export function getRegisterReportName(status: Status): string {
  const statusName: Record<Status, string> = {
    [RegisterReportEnum.Postpone]: "Xin điểm I",
    [RegisterReportEnum.Report]: "Báo cáo",
  };
  return statusName[status];
}

export function getRegisterReportColor(status: Status): string {
  const statusColor: Record<Status, string> = {
    [RegisterReportEnum.Postpone]: "orange",
    [RegisterReportEnum.Report]: "green",
  };
  return statusColor[status];
}

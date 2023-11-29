import { RegisterReportEnum } from "@/apis/models/RegisterReportEnum";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { ReportStatus } from "@/apis/models/ReportTopic";

type Status = RegisterReportEnum;

type PiConfirm = RegisterStatusEnum;

export function getRegisterReportName(status: Status): string {
  const statusName: Record<Status, string> = {
    [RegisterReportEnum.Postpone]: "Xin điểm I",
    [RegisterReportEnum.Report]: "Báo cáo",
  };
  return statusName[status];
}

export function getRegisterReportShortName(status: Status): string {
  const statusName: Record<Status, string> = {
    [RegisterReportEnum.Postpone]: "Điểm I",
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

export function getPiConfirmIcon(status: PiConfirm): string {
  const iconString: Record<PiConfirm, string> = {
    [RegisterStatusEnum.Pending]: "mdi-menu-down",
    [RegisterStatusEnum.Approve]: "mdi-check-circle",
    [RegisterStatusEnum.Reject]: "mdi-minus-circle",
  };
  return iconString[status];
}

export function getPiConfirmLabel(status: PiConfirm): string {
  const iconString: Record<PiConfirm, string> = {
    [RegisterStatusEnum.Pending]: "Chưa phê duyệt",
    [RegisterStatusEnum.Approve]: "Đã phê duyệt",
    [RegisterStatusEnum.Reject]: "Đã từ chối",
  };
  return iconString[status];
}

export function reportStatusLabel(reportStatus: ReportStatus): string {
  const { piConfirm, studentRegister } = reportStatus;
  return piConfirm === RegisterStatusEnum.Approve
    ? getRegisterReportShortName(studentRegister)
    : "Chưa có";
}

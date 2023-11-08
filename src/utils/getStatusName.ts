import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";

type Status = RegisterStatusEnum;

export function getStatusName(status: Status): string | undefined {
  const statusColor: Record<Status, string> = {
    [RegisterStatusEnum.Approve]: "Đã duyệt",
    [RegisterStatusEnum.Reject]: "Từ chối",
    [RegisterStatusEnum.Pending]: "Phê duyệt",
  };
  return statusColor[status];
}

export function getStatusNameObject(status: Status): string | undefined {
  const statusColor: Record<Status, string> = {
    [RegisterStatusEnum.Approve]: "Đã duyệt",
    [RegisterStatusEnum.Reject]: "Từ chối",
    [RegisterStatusEnum.Pending]: "Phê duyệt",
  };
  return statusColor[status];
}

export function getStatusLabel(status: Status): string {
  const statusColor: Record<Status, string> = {
    [RegisterStatusEnum.Approve]: "Đã được duyệt",
    [RegisterStatusEnum.Reject]: "Không được duyệt",
    [RegisterStatusEnum.Pending]: "Đang chờ duyệt",
  };
  return statusColor[status];
}

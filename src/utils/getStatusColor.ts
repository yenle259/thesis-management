import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";

type Status = RegisterStatusEnum;

export function getStatusColor(status: Status): string | undefined {
  const statusColor: Record<Status, string> = {
    [RegisterStatusEnum.Approve]: "green",
    [RegisterStatusEnum.Reject]: "red",
    [RegisterStatusEnum.Pending]: "orange",
  };
  return statusColor[status];
}

export function getStatusIcon(status: Status): string {
  const iconString: Record<Status, string> = {
    [RegisterStatusEnum.Pending]: "mdi-progress-helper",
    [RegisterStatusEnum.Approve]: "mdi-checkbox-marked-circle-outline",
    [RegisterStatusEnum.Reject]: "mdi-minus-circle-outline",
  };
  return iconString[status];
}

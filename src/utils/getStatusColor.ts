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

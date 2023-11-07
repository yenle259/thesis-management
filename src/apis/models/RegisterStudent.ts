import { RegisterStatusEnum } from "./RegisterStatusEnum";
import { StudentDetails } from "./StudentDetails";

export interface RegisterStudent {
  _id: string;
  studentInfo: StudentDetails | string;
  status: RegisterStatusEnum;
  reason: string;
}

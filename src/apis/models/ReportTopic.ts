import { LecturerDetails } from "./LecturerDetails";
import { TopicDetails } from "./TopicDetails";
import { StudentDetails } from "./StudentDetails";
import { RegisterReportEnum } from "./RegisterReportEnum";

export interface ReportTopic {
  _id: string;
  pi: LecturerDetails;
  student: StudentDetails;
  topic: TopicDetails;
  numberOfStudent: number;
  reportStatus: {
    studentRegister: RegisterReportEnum;
    piConfirm: Boolean;
  };
}

export interface ReportStatus {
  studentRegister: RegisterReportEnum;
  piConfirm: Boolean;
}

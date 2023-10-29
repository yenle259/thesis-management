import { LecturerDetails } from "./LecturerDetails";
import { TopicDetails } from "./TopicDetails";
import { StudentDetails } from "./StudentDetails";

export interface ReportTopic {
  _id: string;
  pi: LecturerDetails;
  student: StudentDetails;
  topic: TopicDetails;
  numberOfStudent: number;
  isReport: boolean;
}

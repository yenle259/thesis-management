import { RegisterStudent } from "./RegisterStudent";
import { SchoolYearSemester } from "./SchoolYearSemester";
import { TopicStatusEnum } from "./TopicStatusEnum";
import type { TopicTypeEnum } from "./TopicTypeEnum";
import { UserDetails } from "./UserDetails";

export interface TopicDetails {
  _id: string;
  name: string;
  slug: string;
  type: TopicTypeEnum;
  description: string;
  pi: UserDetails;
  numberOfStudent: number;
  student: RegisterStudent[];
  isDisplay: boolean;
  semester: SchoolYearSemester;
  status?: TopicStatusEnum;
}

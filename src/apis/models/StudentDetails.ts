import type { UserRoleEnum } from "./UserRoleEnum";

export interface StudentDetails {
  studentId: string;
  email: string;
  name: string;
  role: UserRoleEnum;
  course: Number;
  major: String;
}

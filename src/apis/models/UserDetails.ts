import type { UserRoleEnum } from "./UserRoleEnum";

export interface UserDetails {
  studentId: string;
  email: string;
  name: string;
  role: UserRoleEnum;
}

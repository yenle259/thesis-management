import type { UserRoleEnum } from "./UserRoleEnum";

export interface LecturerDetails {
  _id: string;
  userId: string;
  email: string;
  name: string;
  role: UserRoleEnum;
  phone: string;
}

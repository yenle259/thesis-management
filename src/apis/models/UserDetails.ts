import type { UserRoleEnum } from "./UserRoleEnum";

export interface UserDetails {
  _id: string;
  userId: string;
  email: string;
  name: string;
  role: UserRoleEnum;
  phone: string;
}

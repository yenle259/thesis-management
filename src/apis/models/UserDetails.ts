import type { UserRoleEnum } from "./UserRoleEnum";

export interface UserDetails {
  userId: string;
  email: string;
  name: string;
  role: UserRoleEnum;
}

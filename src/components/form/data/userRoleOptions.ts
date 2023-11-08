import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

export const userRoleOptions = [
  {
    title: getUserRoleName(UserRoleEnum.Lecturer),
    value: UserRoleEnum.Lecturer,
  },
  {
    title: getUserRoleName(UserRoleEnum.Admin),
    value: UserRoleEnum.Admin,
  },
];

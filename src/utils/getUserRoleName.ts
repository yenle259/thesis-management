import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

type UserRoleName = UserRoleEnum;

export function getUserRoleName(userRole: UserRoleName): string | undefined {
  const userRoleName: Record<UserRoleName, string> = {
    [UserRoleEnum.Student]: "Sinh viên",
    [UserRoleEnum.Lecturer]: "Giảng viên",
    [UserRoleEnum.Admin]: "Cán bộ quản lý",
  };
  return userRoleName[userRole];
}

import type { RouteLocationRaw } from "vue-router";

import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

export const PAGE_NOT_FOUND = "/404";

export const PUBLIC_PATHS: RouteLocationRaw[] = ["/login", "/404"];


export const LECTURER_PATHS: RouteLocationRaw[] = [
  "/manage/student",
];

export const ADMIN_PATHS: RouteLocationRaw[] = [
  "/manage/student",
  "/manage/lecturer",
  "/manage/topic",
];

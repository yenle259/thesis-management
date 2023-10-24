import { SchoolYearSemester } from "./SchoolYearSemester";

export interface RegisterModule {
  _id: string;
  semester: SchoolYearSemester;
  moduleType: string;
}

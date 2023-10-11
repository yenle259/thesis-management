export interface SchoolYearSemester {
  _id: string;
  sysId: string;
  semester: number;
  schoolYear: {
    beginAt: Date;
    endAt: Date;
  };
}

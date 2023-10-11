import { ref } from "vue";

type SemesterData = {
  sysId: string;
  semester: number;
  schoolYear: {
    beginAt: Date;
    endAt: Date;
  };
};

export function semesterData() {
  const semesters = ref<SemesterData[]>([]);
  const recentYear = new Date();
  const recentYearNumber = recentYear.getFullYear();
  const beginYear = new Date("2018");
  const beginYearNumber = beginYear.getFullYear();

  for (let i = beginYearNumber; i <= recentYearNumber; i++) {
    for (let semester = 1; semester <= 3; semester++) {
      // begin at 1st August and endAt last day of July
      const beginDate = new Date(i, 7, 1);
      const endDate = new Date(i + 1, 6, 31);
      // sysId is unique and check schoolyear Semester
      const sysId = "s" + semester + "b" + beginDate.getFullYear();

      semesters.value.push({
        sysId,
        semester,
        schoolYear: {
          beginAt: beginDate,
          endAt: endDate,
        },
      });
    }
  }
  return semesters;
}

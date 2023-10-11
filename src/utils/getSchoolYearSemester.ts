import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";

export function getSchoolYearSemester(sys: SchoolYearSemester) {
  const { semester, schoolYear } = sys;
  const { beginAt, endAt } = schoolYear;
  const beginAtYear = new Date(beginAt).getFullYear();
  const endAtYear = new Date(endAt).getFullYear();
  let semesterStr = "";

  if (semester === 1) {
    semesterStr = "I";
  } else if (semester === 2) {
    semesterStr = "II";
  } else {
    semesterStr = "Hè";
  }
  return "Học kì " + semesterStr + " (" + beginAtYear + " - " + endAtYear + ")";
}

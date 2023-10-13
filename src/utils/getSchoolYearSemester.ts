import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";

export function getSchoolYearSemester(
  sys: SchoolYearSemester,
  shorter?: boolean
) {
  const { semester, schoolYear } = sys;
  const { beginAt, endAt } = schoolYear;
  const beginAtYear = new Date(beginAt).getFullYear();
  const endAtYear = new Date(endAt).getFullYear();
  let semesterStr = "";

  if (semester === 1) {
    semesterStr = "1";
  } else if (semester === 2) {
    semesterStr = "2";
  } else {
    semesterStr = shorter === true ? "3" : "Hè";
  }

  return (
    (shorter ? "HK" : "Học kì ") +
    semesterStr +
    " (" +
    beginAtYear +
    " - " +
    endAtYear +
    ")"
  );
}

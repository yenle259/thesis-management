import { ref } from "vue";
import { SchoolYearSemester } from "./models/SchoolYearSemester";
import API from "./helpers/axiosBaseConfig";

const useSemester = async () => {
  const semesters = ref<SchoolYearSemester[]>();
  try {
    const { data: response } = await API.get(`/sys`);
    semesters.value = response;
    return response;
  } catch (error) {
    // console.log(error);
  }
  return semesters;
};

export default useSemester;

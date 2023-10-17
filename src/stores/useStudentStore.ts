import { ref } from "vue";
import { defineStore } from "pinia";
import { StudentDetails } from "@/apis/models/StudentDetails";

export const useStudentStore = defineStore(
  "student",
  () => {
    const studentInfo = ref<StudentDetails>();
    const registerModule = ref<string>();

    function reset() {
      const newStudent = ref<StudentDetails>();
      const newRegisterModule = ref<string>();
      studentInfo.value = newStudent.value;
      registerModule.value = newRegisterModule.value;
    }

    return { studentInfo, registerModule, reset };
  },
  {
    persist: true,
  }
);

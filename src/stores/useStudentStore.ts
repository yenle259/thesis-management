import type { RegisterModule } from "@/apis/models/RegisterModule";

export const useStudentStore = defineStore(
  "student",
  () => {
    const registerModule = ref<RegisterModule[]>();

    function reset() {
      const newRegisterModule = ref<RegisterModule[]>();
      registerModule.value = newRegisterModule.value;
    }

    return { registerModule, reset };
  },
  {
    persist: true,
  }
);

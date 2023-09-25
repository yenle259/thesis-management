import { ref } from "vue";
import type { UserDetails } from "@/apis/models/UserDetails";
import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<UserDetails>();
    const token = ref<string>();
    return { user, token };
  }
  // {
  //   persist: true,
  // },
);

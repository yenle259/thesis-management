import type { UserDetails } from "@/apis/models/UserDetails";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<UserDetails>();
    const token = ref<string>();

    function reset() {
      const newUser = ref<UserDetails>();
      const newToken = ref<string>();
      user.value = newUser.value;
      token.value = newToken.value;
    }

    return { user, token, reset };
  },
  {
    persist: true,
  }
);

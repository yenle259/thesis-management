import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/useAuthStore";

import type { LoginResponse } from "./models/LoginResponse";

export function useUserLogin(context: LoginResponse) {
  const authStore = useAuthStore();
  const { user, token } = storeToRefs(authStore);

  const { me, access_token } = context;
  user.value = me;
  token.value = access_token;

  return context;
}

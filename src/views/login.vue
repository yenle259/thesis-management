<template>
  <div>
    <div class="home bg-sky-50 m-auto h-screen">
      <div>
        <div class="mx-16 pt-2 text-white border-b-2">
          <v-card-title class="py-4">
            <a href="/login" class="logo font-bold text-2xl">
              HỆ THỐNG QUẢN LÝ ĐỀ TÀI
            </a>
          </v-card-title>
        </div>
      </div>
      <div class="h-5/6 w-2/5 m-auto flex items-center">
        <LoginForm />
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/useAuthStore";

useTitle("QLĐT - Đăng nhập");
</script>

<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    const auth = useAuthStore();
    if (auth.user) {
      next("/user");
    } else {
      next(true);
    }
  },
};
</script>
<style scoped>
.home {
  background-image: url("@img/ctu_bg.png");
}

.logo {
  font-family: "Be Vietnam Pro", sans-serif;
}
</style>

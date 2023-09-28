<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        class="bg-indigo"
        v-model="drawer"
        :rail="rail"
        :permanent="true"
        @click="rail = false"
      >
        <div class="h-16 text-center flex content-center justify-center">
          <a
            href="/"
            class="font-semibold text-2xl text-white flex content-center self-center"
            >QUẢN LÝ ĐỀ TÀI
          </a>
        </div>
        <v-divider></v-divider>
        <v-list-item nav>
          <div class="text-center py-1">
            <v-avatar color="indigo-lighten-5" size="50">
              <span class="text-h5">{{
                user?.email.charAt(0).toLocaleUpperCase()
              }}</span>
            </v-avatar>
            <h3 class="pt-3 font-medium text-lg">
              {{ user?.name }}
            </h3>
            <p class="text-caption mt-1">
              {{ user?.email }}
            </p>
          </div>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav density="compact">
          <v-list-item prepend-icon="mdi-account" href="/user"
            >Thông tin người dùng</v-list-item
          >
          <v-list-item
            prepend-icon="mdi-account-multiple-outline"
            href="/lecturers"
            >Danh sách giảng viên</v-list-item
          >
          <v-list-item
            prepend-icon="mdi-format-list-bulleted"
            href="/topic-list"
            >Danh sách đề tài</v-list-item
          >
          <!-- <v-list-group value="Admin">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-account-supervisor-circle"
                >Đăng ký đề tài</v-list-item
              >
            </template>

            <v-list-item
              v-for="([title, icon, href], i) in menuItems"
              :key="i"
              :title="title"
              :prepend-icon="icon"
              :value="title"
              :href="href"
            ></v-list-item>
          </v-list-group> -->
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn
              append-icon="mdi-logout-variant"
              rounded="lg"
              variant="flat"
              @click="handleLogout"
              block
            >
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main class="h-screen">
        <!-- <Navbar /> -->
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Navbar from "./Navbar.vue";
import axios from "axios";
import router from "@/router";
import { BASE_API } from "../../constant";

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const drawer = ref(true);
const rail = ref(false);

const handleLogout = () => {
  axios({
    url: BASE_API + `/auth/logout`,
    withCredentials: true,
  })
    .then(function (res) {
      //reset value of auth user and redirect user
      auth.reset();
      router.push("/");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error);
      }
    });
};
</script>

<style scoped>
.sidenav {
  background-color: #1e40af;
  color: white;
}
</style>

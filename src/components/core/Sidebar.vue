<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        class="bg-indigo font-bevn"
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
        <v-list-item :key="user?._id" class="py-2">
          <p class="">{{ user?.name }}</p>
          <p class="text-caption">{{ user?.email }}</p>
          <template v-slot:prepend>
            <v-btn
              class="me-2"
              variant="flat"
              color="teal"
              size="40"
              rounded
              @click="
                () => {
                  router.push('/user');
                }
              "
            >
              <span class="text-h5">{{
                user?.name.charAt(0).toLocaleUpperCase()
              }}</span>
            </v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav density="compact">
          <v-list-item prepend-icon="mdi-account" href="/user"
            >Thông tin cá nhân</v-list-item
          >
          <v-list-subheader color="white">THÔNG TIN CHUNG</v-list-subheader>
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
          <!-- admin route list -->
          <div v-if="isAdmin">
            <v-list-subheader color="white">QUẢN LÍ</v-list-subheader>
            <v-list-group
              v-for="route in adminRoutes"
              :prepend-icon="route.icon"
              :key="route.label"
              :value="route.label"
            >
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="route.label"></v-list-item>
              </template>

              <v-list-item
                v-for="item in route.subItem"
                :key="item.url"
                :title="item.label"
                :href="item.url"
                :value="item.label"
              ></v-list-item>
            </v-list-group>
          </div>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn
              class="text-red"
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
      <v-main class="h-screen"> </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/useAuthStore";
import { useStudentStore } from "@/stores/useStudentStore";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

import router from "@/router";
import { BASE_API } from "@/constant";

const student = useStudentStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);

const drawer = ref(true);
const rail = ref(false);

const isAdmin = ref(user.value?.role === UserRoleEnum.Admin);

const adminRoutes = ref([
  {
    icon: "mdi-account-multiple-outline",
    label: "Người dùng",
    subItem: [
      {
        icon: "mdi-account-school-outline",
        label: "Sinh viên",
        url: "/manage/student",
      },
      {
        icon: "mdi-calendar-range",
        label: "Giảng viên",
        url: "/manage/lecturer",
      },
    ],
  },
  {
    icon: "mdi-format-list-text",
    label: "Đề tài",
    subItem: [
      {
        icon: "mdi-calendar-range",
        label: "Học kì - Niên khóa",
        url: "/semester",
      },
    ],
  },
]);

const handleLogout = () => {
  axios({
    url: BASE_API + `/auth/logout`,
    withCredentials: true,
  })
    .then(function (res) {
      //reset value of auth user and redirect user
      auth.reset();
      student.reset();
      router.push("/login");
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

.font-bevn {
  font-family: "Be Vietnam Pro";
}
</style>

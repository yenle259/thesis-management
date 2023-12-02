<template>
  <div>
    <v-layout>
      <div class="h-screen flex flex-grow">
        <v-navigation-drawer
          class="bg-indigo font-bevn h-screen"
          v-model="drawer"
          permanent
          rail-width="65"
        >
          <div class="h-16 text-center flex content-center justify-center">
            <a
              class="font-semibold text-2xl text-white flex content-center self-center"
              ><span>QUẢN LÝ ĐỀ TÀI</span>
              <!-- <v-icon v-else size="md">mdi-menu</v-icon> -->
            </a>
          </div>
          <v-divider></v-divider>

          <v-list nav density="compact">
            <!-- public route for student and lecturer -->

            <div
              v-for="({ role, subheader, list }, index) in routeByRole"
              :key="index"
            >
              <div v-if="role === user?.role">
                <v-list-subheader v-if="subheader" color="white"
                  ><span class="uppercase">
                    {{ subheader }}
                  </span>
                </v-list-subheader>
                <div class="px-1">
                  <v-list-item
                    v-for="{ url, label, icon } in list"
                    :key="url"
                    :title="label"
                    :value="url"
                    :prepend-icon="icon"
                    @click="router.push(url)"
                    active-class="rounded-lg bg-white text-indigo"
                  ></v-list-item>
                </div>
              </div>
            </div>

            <div>
              <div
                v-for="({ subheader, list }, index) in publicRoutes"
                :key="index"
              >
                <v-list-subheader v-if="subheader" color="white"
                  ><span class="uppercase">
                    {{ subheader }}
                  </span>
                </v-list-subheader>
                <div class="px-1">
                  <v-list-item
                    v-for="{ url, label, icon } in list"
                    :key="url"
                    :title="label"
                    :value="url"
                    :prepend-icon="icon"
                    @click="router.push(url)"
                    active-class="rounded-lg bg-white text-indigo"
                  ></v-list-item>
                </div>
              </div>
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
                Đăng xuất
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
      </div>

      <v-main> </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/useAuthStore";
import { useStudentStore } from "@/stores/useStudentStore";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

import router from "@/router";
import { BASE_API } from "@/constant";

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const student = useStudentStore();

const drawer = ref(true);

const publicRoutes = ref([
  {
    subheader: "Thông tin chung",
    list: [
      {
        icon: "mdi-format-list-checks",
        label: "Danh sách đề tài",
        url: "/topic-list",
      },
      {
        icon: "mdi-format-list-bulleted-square",
        label: "Đề tài chung",
        url: "/topics",
      },
      {
        icon: "mdi-account-school",
        label: "Danh sách giảng viên",
        url: "/lecturers",
      },
    ],
  },
]);

const routeByRole = [
  {
    subheader: "Cá nhân",
    list: [
      {
        icon: "mdi-account",
        label: "Thông tin đăng ký",
        url: "/user",
      },
    ],
  },
  {
    role: UserRoleEnum.Lecturer,
    subheader: "Cá nhân",
    list: [
      {
        icon: "mdi-account",
        label: "Đề tài của tôi",
        url: "/my-topic",
      },
    ],
  },
  {
    role: UserRoleEnum.Admin,
    subheader: "Cá nhân",
    list: [
      {
        icon: "mdi-account",
        label: "Đề tài của tôi",
        url: "/my-topic",
      },
    ],
  },
  {
    role: UserRoleEnum.Admin,
    subheader: "Quản lí",
    list: [
      {
        icon: "mdi-format-list-bulleted",
        label: "Đề tài",
        url: "/manage/topic",
      },
      {
        icon: "mdi-account",
        label: "Sinh viên",
        url: "/manage/student",
      },
      {
        icon: "mdi-account-school",
        label: "Cán bộ",
        url: "/manage/lecturer",
      },
      {
        icon: "mdi-calendar-range",
        label: "Danh mục",
        url: "/semester",
      },
      {
        icon: "mdi-account-key",
        label: "Đặt lại mật khẩu",
        url: "/manage/account",
      },
    ],
  },
];

const handleLogout = () => {
  axios({
    url: BASE_API + `/auth/logout`,
    withCredentials: true,
  })
    .then(function () {
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

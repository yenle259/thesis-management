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
        <!-- user account and email -->
        <!-- <v-list-item :key="user?._id" class="py-2">
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
        </v-list-item> -->

        <v-divider></v-divider>

        <v-list nav density="compact">
          <!-- public route for student and lecturer -->

          <div v-if="!isAdmin">
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
                  :value="label"
                  :prepend-icon="icon"
                  @click="router.push(url)"
                  active-class="rounded-lg bg-white text-indigo"
                ></v-list-item>
              </div>
            </div>
          </div>

          <!-- admin route list -->
          <div v-if="isAdmin">
            <div
              v-for="({ subheader, list }, index) in adminRoutes"
              :key="index"
            >
              <v-list-subheader color="white"
                ><span class="uppercase">
                  {{ subheader }}
                </span>
              </v-list-subheader>
              <div class="px-1">
                <v-list-item
                  v-for="{ url, label, icon } in list"
                  :key="url"
                  :title="label"
                  :value="label"
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

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const student = useStudentStore();

const drawer = ref(true);

const rail = ref(false);

const isAdmin = ref(user.value?.role === UserRoleEnum.Admin);

const publicRoutes = ref([
  {
    subheader: "Cá nhân",
    list: [
      {
        icon: "mdi-account",
        label: "Đề tài của tôi",
        url: "/user",
      },
    ],
  },
  {
    subheader: "Thông tin chung",
    list: [
      {
        icon: "mdi-account-school",
        label: "Danh sách giảng viên",
        url: "/lecturers",
      },
      {
        icon: "mdi-format-list-bulleted",
        label: "Danh sách đề tài",
        url: "/topic-list",
      },
    ],
  },
]);

const adminRoutes = ref([
  {
    subheader: "Quản lí",
    list: [
      {
        icon: "mdi-calendar-range",
        label: "Học kì - Niên khóa",
        url: "/semester",
      },
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
        label: "Giảng viên",
        // url: "/manage/lecturer",
        url: "/lecturers",
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

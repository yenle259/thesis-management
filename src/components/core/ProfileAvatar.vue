<template>
  <div>
    <div>
      <v-menu :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn color="teal" size="40" v-bind="props" rounded variant="flat"
            ><span class="text-h6">{{
              user?.name.charAt(0).toLocaleUpperCase()
            }}</span>
          </v-btn>
        </template>

        <v-card min-width="230" variant="flat" class="rounded-lg mt-4 ml-32">
          <div class="mx-auto">
            <v-list density="compact">
              <v-list-item :key="user?._id" class="py-1" v-if="user">
                <p>{{ user.name }}</p>
                <p class="text-caption">
                  {{ getUserRoleName(user.role) }}
                </p>
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
              <hr class="mt-1" />
              <div class="p-2">
                <v-list-item
                  active-color="blue"
                  class="rounded-lg"
                  v-for="({ label, icon, url }, index) in profileRoutes"
                  :key="index"
                  :prepend-icon="icon"
                  :title="label"
                  :href="url"
                ></v-list-item>
                <v-divider></v-divider>
                <v-list-item
                  title="Đăng xuất"
                  prepend-icon="mdi-logout"
                  class="rounded-lg"
                  @click="handleLogout"
                >
                </v-list-item>
              </div>
            </v-list>
          </div>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStore";
import { useStudentStore } from "@/stores/useStudentStore";
import { BASE_API } from "@/constant";

const student = useStudentStore();

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const profileRoutes = ref([
  {
    icon: "mdi-account-circle-outline",
    label: "Hồ sơ",
    url: "/",
  },
  {
    icon: "mdi-cog-outline",
    label: "Cài đặt",
    url: "/manage/lecturer",
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

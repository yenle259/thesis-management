<template>
  <div>
    <div class="text-center">
      <v-menu :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn
            color="teal"
            size="45"
            v-bind="props"
            icon="mdi-account"
            variant="flat"
            ><span class="text-h5">{{
              user?.email.charAt(0).toLocaleUpperCase()
            }}</span>
          </v-btn>
        </template>

        <v-card
          min-width="250"
          variant="flat"
          class="mx-auto py-1 rounded-lg"
          rounded=""
        >
          <div class="mx-auto text-center">
            <v-list>
              <v-list-item>
                <v-avatar color="teal" size="40">
                  <span class="text-h5">{{
                    user?.email.charAt(0).toLocaleUpperCase()
                  }}</span>
                </v-avatar>
              </v-list-item>
              <h3 class="pt-1 font-medium text-blue-700 text-lg">
                {{ user?.name }}
              </h3>
              <p class="text-caption">
                {{ user?.email }}
              </p>
            </v-list>

            <v-divider></v-divider>
            <v-card-actions class="mx-1">
              <v-spacer></v-spacer>
              <v-btn
                prepend-icon="mdi-logout"
                color="red"
                rounded="lg"
                variant="tonal"
                @click="handleLogout"
              >
                Logout
              </v-btn>
            </v-card-actions>
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

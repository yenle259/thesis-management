<template>
  <div class="w-full font-bevn">
    <v-card class="px-6 py-8 hover:shadow-md rounded-lg" variant="flat">
      <v-form v-model="form">
        <p class="text-center font-bold text-2xl pb-4 text-blue-500">
          ĐĂNG NHẬP
        </p>
        <v-text-field
          v-model="model.studentId"
          :required="true"
          :rules="rules.studentId"
          :error-messages="errorMessage.studentId"
          class="mb-2"
          clearable
          label="Mã số định danh"
          prepend-inner-icon="mdi-account-outline"
        ></v-text-field>

        <v-text-field
          v-model="model.password"
          :readonly="loading"
          :rules="rules.password"
          :error-messages="errorMessage.password"
          label="Mật khẩu"
          prepend-inner-icon="mdi-key-outline"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append-inner="show = !show"
        ></v-text-field>

        <v-btn
          class="mt-2"
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          type="submit"
          variant="elevated"
          :onclick="handleSubmit"
        >
          ĐĂNG NHẬP
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { BASE_API } from "../../../constant";
import { ref, watch } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/useAuthStore";

const show = ref(false);
const form = ref();
const loading = ref(false);

const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);

const errorMessage = ref({
  studentId: "",
  password: "",
});

const model = ref({
  studentId: "",
  password: "",
});

const rules = ref({
  studentId: [
    (value: any) => {
      if (value?.length == 0) return "Credential ID is required";
      return true;
    },
  ],
  password: [
    (value: any) => {
      if (value?.length == 0) return "Password is required";
      if (value?.length >= 8) return true;
      return "Password must be more than 8 characters.";
    },
  ],
});

watch(
  () => model.value.studentId,
  () => {
    errorMessage.value.studentId = "";
  }
);

watch(
  () => model.value.password,
  () => {
    errorMessage.value.password = "";
  }
);

const handleSubmit = (e: Event) => {
  e.preventDefault();

  axios({
    method: "post",
    url: BASE_API + `/auth/login`,
    withCredentials: true,
    data: {
      studentId: model.value.studentId,
      password: model.value.password,
    },
  })
    .then(function (res) {
      user.value = res.data.user;
      token.value = res.data.access_token;

      router.push("/user");
    })
    .catch(function (error) {
      if (error.response) {
        const { errors } = error.response.data;
        if (errors.studentId) {
          errorMessage.value.studentId = errors.studentId;
        }
        if (errors.password) {
          errorMessage.value.password = errors.password;
        }
      }
    });
};
</script>

<style scoped>
.font-bevn {
  font-family: "Be Vietnam Pro";
}
</style>

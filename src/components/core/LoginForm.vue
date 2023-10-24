<template>
  <div class="w-full font-bevn">
    <v-card class="px-6 py-8 hover:shadow-md rounded-lg" variant="flat">
      <v-form v-model="form">
        <p class="text-center font-bold text-2xl pb-4 text-blue-500">
          ĐĂNG NHẬP
        </p>
        <v-text-field
          v-model="model.userId"
          :required="true"
          :rules="rules.userId"
          :error-messages="errorMessage.userId"
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
import { BASE_API } from "@/constant";
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStore";
import { useStudentStore } from "@/stores/useStudentStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const show = ref(false);

const form = ref();

const loading = ref(false);

const authStore = useAuthStore();

const { user, token } = storeToRefs(authStore);

const studentStore = useStudentStore();

const { registerModule } = storeToRefs(studentStore);

const errorMessage = ref({
  userId: "",
  password: "",
});

const model = ref({
  userId: "",
  password: "",
});

const rules = ref({
  userId: [
    (value: any) => {
      if (value?.length == 0) return "Nhập mã số định danh";
      return true;
    },
  ],
  password: [
    (value: any) => {
      if (value?.length == 0) return "Nhập mật khẩu";
      if (value?.length >= 8) return true;
      return "Mật khẩu phải dài hơn 8 kí tự";
    },
  ],
});

watch(
  () => model.value.userId,
  () => {
    errorMessage.value.userId = "";
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
      userId: model.value.userId,
      password: model.value.password,
    },
  })
    .then(function (res) {
      user.value = res.data.user;
      token.value = res.data.access_token;

      if (!res.data.user.role) {
        registerModule.value = res.data.user.registerModule;
      }

      toast.success("Đăng nhập thành công");
      setTimeout(() => router.push("/user"), 1000);
    })
    .catch(function (error) {
      if (error.response) {
        const { errors } = error.response.data;
        if (errors.userId) {
          errorMessage.value.userId = errors.userId;
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

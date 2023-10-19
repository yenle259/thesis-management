<template>
  <div>
    <v-card class="mx-auto px-6 py-8 hover:shadow-md">
      <v-form v-model="form">
        <p class="text-center font-bold text-xl pb-4 text-blue-500">ĐĂNG KÝ</p>
        <v-text-field
          v-model="model.userId"
          :required="true"
          :rules="rules.userId"
          :error-messages="errorMessage.userId"
          class="mb-2"
          clearable
          label="Mã số sinh viên"
          prepend-inner-icon="mdi-account-outline"
        ></v-text-field>

        <v-text-field
          v-model="model.name"
          :required="true"
          :rules="rules.name"
          :error-messages="errorMessage.name"
          class="mb-2"
          clearable
          label="Họ và tên"
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
          :disabled="!form"
          :loading="loading"
          block
          color="primary"
          type="submit"
          variant="elevated"
          :onclick="handleSubmit"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { BASE_API } from "../../../constant";
import router from "@/router";

const show = ref(false);
const form = ref();
const loading = ref(false);

const errorMessage = ref({
  userId: "",
  name: "",
  password: "",
});

const model = ref({
  userId: "",
  name: "",
  email: "",
  password: "",
});

const rules = ref({
  userId: [
    (value: any) => {
      if (value?.length == 0) return "Student ID is required";
      if (value?.length == 8) return true;
      return "Student ID must be have 8 characters.";
    },
  ],
  name: [
    (value: any) => {
      if (value?.length == 0) return "Username is required";
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

const handleEmail = (userId: String, name: String) => {
  return (name.split(" ")[name.split(" ").length - 1] + userId).toLocaleLowerCase();
};

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
  model.value.email = handleEmail(model.value.userId, model.value.name);
  console.log(model.value.email);

  axios({
    method: "post",
    url: BASE_API + `/auth/signup`,
    withCredentials: true,
    data: {
      userId: model.value.userId,
      name: model.value.name,
      email: model.value.email,
      password: model.value.password,
    },
  })
    .then(function (response) {
      console.log(response);
      router.push("/user");
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

<template>
  <div>
    <v-form v-model="form">
      <v-card-title class="d-flex text-h5 text-indigo justify-end">
      </v-card-title>
      <v-card-text class="pt-2">
        <div class="grid grid-cols-2 gap-x-2">
          <v-text-field
            v-model="model.userId"
            :required="true"
            :rules="rules.userId"
            :error-messages="errorMessage.userId"
            class="mb-2"
            clearable
            label="Mã số cán bộ"
            counter
            prepend-inner-icon="mdi-at"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model="model.password"
            :readonly="loading"
            :rules="rules.password"
            :error-messages="errorMessage.password"
            :type="show ? 'text' : 'password'"
            :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show = !show"
            class="mb-2"
            prepend-inner-icon="mdi-key"
            variant="outlined"
            label="Mật khẩu"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model="model.name"
            :required="true"
            :rules="rules.name"
            :error-messages="errorMessage.name"
            class="mb-2"
            clearable
            label="Họ tên"
            prepend-inner-icon="mdi-account-circle-outline"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-text-field
            v-model="model.email"
            type="email"
            :required="true"
            :rules="rules.email"
            :error-messages="errorMessage.email"
            class="mb-2"
            label="Email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-autocomplete
            v-model="model.role"
            :rules="rules.role"
            :items="userRoleOptions"
            item-value="subvalue"
            prepend-inner-icon="mdi-format-list-bulleted"
            label="Vai trò"
            placeholder="Vai trò"
            class="mb-2"
            chips
            clearable
            density="compact"
            variant="outlined"
          ></v-autocomplete>
        </div>
        <div class="d-flex justify-end">
          <v-btn
            icon="mdi-restore"
            variant="text"
            color="grey-darken-2"
            title="Làm mới form thông tin"
            @click="handleResetForm"
          ></v-btn>
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="primary"
            class="me-2 self-center"
            type="submit"
            variant="elevated"
            :onclick="handleSubmit"
          >
            Thêm mới
          </v-btn>
        </div>
      </v-card-text>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { BASE_API, LECTURER_MAIL } from "@/constant";

import { lecturerCreateRules } from "../form/rules/lecturerCreateRules";

const emit = defineEmits(["created"]);

defineProps<{
  modules: ModuleDetails[];
}>();

const show = ref(false);

const form = ref();

const loading = ref(false);

const errorMessage = ref({
  userId: "",
  name: "",
  email: "",
  password: "",
  role: "",
});

const model = reactive({
  userId: "",
  name: "",
  email: "",
  password: "",
  role: null,
});

const rules = lecturerCreateRules();

const handleEmail = (name: String) => {
  const stdName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
  return (
    stdName
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toLocaleLowerCase() + LECTURER_MAIL
  );
};

watch(
  () => model.userId,
  () => {
    errorMessage.value.userId = "";
  }
);

watch(
  () => model.password,
  () => {
    errorMessage.value.password = "";
  }
);

watch(
  () => model.userId && model.name,
  () => {
    model.email = handleEmail(model.name);
  }
);

const handleResetForm = () => {
  (model.userId = ""),
    (model.name = ""),
    (model.email = ""),
    (model.password = ""),
    (model.role = null);
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  axios({
    method: "post",
    url: BASE_API + `/auth/lecturer/signup`,
    withCredentials: true,
    data: {
      userId: model.userId,
      password: 'Class:>12',
      name: model.name,
      email: model.email,
      role: model.role,
    },
  })
    .then(function () {
      emit("created");
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

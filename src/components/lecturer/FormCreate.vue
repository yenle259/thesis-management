<template>
  <div>
    <v-form v-model="form">
      <v-card-text class="pt-8 px-8">
        <div class="grid grid-cols-2 gap-x-6">
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
            density="compact"
          ></v-text-field>
          <v-autocomplete
            v-model="model.role"
            :rules="rules.role"
            :items="userRoleOptions"
            prepend-inner-icon="mdi-view-list-outline"
            label="Vai trò"
            placeholder="Vai trò"
            class="mb-2"
            chips
            clearable
            density="compact"
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
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

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
  role: UserRoleEnum.Lecturer,
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
    (model.role = UserRoleEnum.Lecturer);
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  axios({
    method: "post",
    url: BASE_API + `/auth/lecturer/signup`,
    withCredentials: true,
    data: {
      userId: model.userId,
      name: model.name,
      email: model.email,
      role: model.role,
    },
  })
    .then(function () {
      handleResetForm();
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

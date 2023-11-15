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
            label="Mã số sinh viên"
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
            v-model="model.moduleType"
            :rules="rules.moduleType"
            :items="moduleOptions"
            item-value="subvalue"
            prepend-inner-icon="mdi-format-list-bulleted"
            label="Học phần đăng ký"
            placeholder="Học phần đăng ký"
            class="mb-2"
            multiple
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
import { topicTypeOptions } from "@/components/form/data/topicTypeOptions";
import { BASE_API, STUDENT_MAIL } from "@/constant";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useModuleOptions } from "@/components/form/data/useModuleOptions";

const emit = defineEmits(["created"]);

const props = defineProps<{
  modules: ModuleDetails[];
}>();

const moduleOptions = useModuleOptions(props.modules);

const show = ref(false);

const form = ref();

const loading = ref(false);

const errorMessage = ref({
  userId: "",
  name: "",
  email: "",
  password: "",
  moduleType: "",
});

const model = reactive({
  userId: "",
  name: "",
  email: "",
  password: "",
  moduleType: [],
});

const rules = ref({
  userId: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào mã số sinh viên";
      if (value?.length == 8) return true;
      return "Mã số sinh viên phải có 8 kí tự";
    },
  ],
  name: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào họ tên sinh viên";
      return true;
    },
  ],
  email: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào email";
      return true;
    },
  ],
  password: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào mật khẩu";
      if (value?.length >= 8) return true;
      return "Mật khẩu phải hơn 8 kí tự";
    },
  ],
  moduleType: [
    () => {
      if (model.moduleType === null) return "Hãy chọn phân loại đề tài";
      return true;
    },
  ],
});

const handleEmail = (userId: String, name: String) => {
  const stdName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
  return (
    (
      stdName.split(" ")[stdName.split(" ").length - 1] + userId
    ).toLocaleLowerCase() + STUDENT_MAIL
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
    model.email = handleEmail(model.userId, model.name);
  }
);

const handleResetForm = () => {
  (model.userId = ""),
    (model.name = ""),
    (model.email = ""),
    (model.password = ""),
    (model.moduleType = []);
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  axios({
    method: "post",
    url: BASE_API + `/auth/student/signup`,
    withCredentials: true,
    data: {
      userId: model.userId,
      password: model.password,
      name: model.name,
      email: model.email,
      moduleType: model.moduleType.join("-"),
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

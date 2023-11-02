<template>
  <div>
    <v-form v-model="form">
      <v-card-title class="d-flex text-h5 text-indigo justify-between">
        <div>
          <span> Thêm tài khoản </span>
          <p class="font-light text-caption text-black">
            Nhập vào các thông tin bên dưới để thêm tài khoản
          </p>
        </div>
        <v-btn
          icon="mdi-restore"
          variant="text"
          color="grey-darken-2"
          title="Làm mới form thông tin"
          @click="handleResetForm"
        ></v-btn>
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
            :suffix="STUDENT_MAIL"
            class="mb-2"
            label="Email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-autocomplete
            v-model="model.moduleType"
            :rules="rules.moduleType"
            :items="topicTypeOptions"
            prepend-inner-icon="mdi-format-list-bulleted"
            label="Phân loại đề tài"
            placeholder="Phân loại đề tài"
            class="mb-2"
            multiple
            chips
            clearable
            density="compact"
            variant="outlined"
          ></v-autocomplete>
        </div>
        <div>
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="primary"
            class="me-2"
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
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import router from "@/router";
import { topicTypeOptions } from "@/components/form/data/topicTypeOptions";

import { STUDENT_MAIL } from "@/constant";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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

// const handleEmail = (userId: String, name: String) => {
//   return (
//     name.split(" ")[name.split(" ").length - 1] + userId
//   ).toLocaleLowerCase();
// };

const handleModuleType = (types: TopicTypeEnum[]) => {
  return types.toString();
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
  () => model.moduleType,
  () => {
    console.log(model.moduleType.join("-"));
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

  try {
    const { data: response } = await API.post(`/auth/student/signup`, {
      userId: model.userId,
      password: model.password,
      name: model.name,
      email: model.email + STUDENT_MAIL,
      moduleType: model.moduleType.join("-"),
    });

    toast.success("Đã thêm mới sinh viên thành công");
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <CustomCard
    :title="'Đặt lại mật khẩu'"
    :subTitle="'Đặt lại mật khẩu cho người dùng'"
    width="700px"
  >
    <template v-slot:content>
      <v-card class="mx-auto" variant="text" max-width="450">
        <div>
          <v-form v-model="form">
            <v-text-field
              v-model="model.userId"
              :rules="rules.userId"
              density="comfortable"
              clearable
              variant="solo"
              label="Mã số người dùng"
              single-line
            >
              <template v-slot:append-inner>
                <v-btn
                  @click="getUserInfo"
                  :disabled="!form"
                  variant="text"
                  prepend-icon="mdi-magnify"
                  color="indigo"
                  >Tìm kiếm
                </v-btn>
              </template>
            </v-text-field></v-form
          >
        </div>
      </v-card>
      <v-expand-transition class="mt-4 mx-auto" max-width="450">
        <v-card
          v-if="user"
          title="Thông tin người dùng"
          class="mx-auto"
          variant="elevated"
        >
          <v-card-item>
            <div>
              <v-icon icon="mdi-account-circle-outline" class="me-2"></v-icon>Họ
              tên người dùng:
              <span>{{ user.name }}</span>
            </div>
            <div class="my-1">
              <v-icon icon="mdi-at" class="me-2"></v-icon>Mã số người dùng:
              <span class="uppercase">
                {{ user.userId }}
              </span>
            </div>
            <div class="mt-1" @click="copy(user.email)">
              <v-icon icon="mdi-email-outline" class="me-2"> </v-icon>Email:
              <v-tooltip
                activator="children"
                location="end"
                :text="copied ? 'Copied' : 'Copy Email'"
              >
                <template v-slot:activator="{ props }">
                  <span v-bind="props">
                    {{ user.email }}
                  </span>
                </template>
              </v-tooltip>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" color="indigo" @click="handleResetPassword">
              Đặt lại mật khẩu
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card variant="text" class="mx-auto" v-else>
          <v-card-text>
            <p class="text-center text-caption">
              Hãy nhập mã số người dùng và nhấn tìm kiếm
            </p>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { LecturerDetails } from "@/apis/models/LecturerDetails";
import { StudentDetails } from "@/apis/models/StudentDetails";
import { useClipboard } from "@vueuse/core";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Quản lý mật khẩu");

const { copy, copied } = useClipboard();

const user = ref<StudentDetails | LecturerDetails>();

const form = ref();

const model = reactive({
  userId: "",
  isDisabledSearch: false,
  isLoading: false,
});

const rules = ref({
  userId: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập mã số người dùng";
      if (value?.length == 4) return true;
      if (value?.length == 8) return true;
      return "Mã số người dùng chưa đúng định dạng";
    },
  ],
});

const getUserInfo = async () => {
  try {
    const { data: response } = await API.get(`/auth/reset/${model.userId}`);
    user.value = response.user;

    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleResetPassword = async () => {
  try {
    const { data: response } = await API.put(`/auth/reset/${model.userId}`);
    toast.success(
      "Đã đặt lại mật khẩu và gửi thông tin qua email cho người dùng"
    );

    return response;
  } catch (error) {
    console.log(error);
    console.log("jj");
  }
};
</script>

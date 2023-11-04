<template>
  <div v-if="props.student">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="pt-4 pb-2 px-2">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1">Xóa tài khoản</span>
            <p class="font-light text-caption text-black">
              Xác nhận xóa tài khoản sinh viên với thông tin bên dưới
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="mb-1">
            <span class="text-subtitle-2">Mã số sinh viên: </span
            ><span class="uppercase">{{ props.student.userId }}</span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Họ tên sinh viên: </span
            >{{ props.student.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Email: </span
            >{{ props.student.email }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn
            color="red"
            variant="tonal"
            @click="handleDelete(props.student)"
          >
            Xóa tài khoản
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { StudentDetails } from "@/apis/models/StudentDetails";

import { TopicDetails } from "@/apis/models/TopicDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["cancel", "deleted"]);

const props = defineProps<{ isShow: boolean; student: StudentDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleDelete = async (student: StudentDetails) => {
  try {
    await API.delete(`/student/${student._id}`);
    emit("deleted");
  } catch (error) {
    console.log(error);
  }
};
</script>

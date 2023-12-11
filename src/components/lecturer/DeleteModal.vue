<template>
  <div v-if="lecturer">
    <v-dialog v-model="dialog" persistent width="550px">
      <v-card class="pt-4 pb-2 px-2 rounded-lg">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1">Xóa tài khoản</span>
            <p class="font-light text-caption text-black">
              Xác nhận xóa tài khoản cán bộ với thông tin bên dưới
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="mb-1">
            <span class="text-subtitle-2">Mã số cán bộ: </span
            ><span class="uppercase">{{ lecturer.userId }}</span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Họ tên cán bộ: </span
            >{{ lecturer.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Email: </span>{{ lecturer.email }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Vai trò: </span
            >{{ getUserRoleName(lecturer.role) }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn
            color="red"
            variant="tonal"
            @click="handleDelete(props.lecturer)"
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
import { LecturerDetails } from "@/apis/models/LecturerDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["cancel", "deleted"]);

const props = defineProps<{ isShow: boolean; lecturer: LecturerDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleDelete = async (lecturer: LecturerDetails) => {
  emit("cancel");
  try {
    const { data: response } = await API.delete(`/user/${lecturer._id}`);
    if (response.statusCode === 200) {
      toast.success("Xóa tài khoản cán bộ thành công");
      emit("deleted");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <v-dialog v-model="dialog" width="500px">
      <v-card class="rounded-lg pt-4 pb-2 px-2" v-click-outside="handleCancel">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1"> Phê duyệt sinh viên đăng ký </span>
            <p class="font-light text-caption text-black">
              Phê duyệt sinh viên thực hiện đề tài
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <p class="mb-1">
            <span class="text-subtitle-2">Mã số sinh viên: </span
            ><span class="uppercase">
              {{ student.userId }}
            </span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Tên sinh viên: </span
            ><span>
              {{ student.name }}
            </span>
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn color="success" variant="tonal"> Phê duyệt </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { StudentDetails } from "@/apis/models/StudentDetails";

const emit = defineEmits(["cancel", "unregistered"]);

const props = defineProps<{ isShow: boolean; student: StudentDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};
</script>

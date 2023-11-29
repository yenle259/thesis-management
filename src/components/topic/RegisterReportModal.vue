<template>
  <div v-if="topic">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="rounded-lg pt-3 pb-2 px-2" v-click-outside="handleCancel">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1">
              Đăng ký
              {{ getRegisterReportName(status) }}
            </span>
            <p class="font-light text-caption text-black">
              Xác nhận đăng ký
              <span class="lowercase">
                {{ getRegisterReportName(status) }}</span
              >
              cho đề tài với thông tin đề tài bên dưới
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <p class="mb-1">
            <span class="text-subtitle-2">Tên đề tài: </span>{{ topic.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Giảng viên: </span>{{ topic.pi.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Phân loại: </span>
            <v-chip
              :color="getTopicModuleColor(topic.module.moduleId)"
              size="small"
            >
              {{ topic.module.moduleId + " | " + topic.module.name }}
            </v-chip>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Học kì - Niên khóa: </span
            >{{ getSchoolYearSemester(topic.semester) }}
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" variant="text" @click="handleCancel">
            Thoát
          </v-btn>
          <v-btn
            :color="getRegisterReportColor(status)"
            variant="tonal"
            @click="handleRegisterReport()"
          >
            Xác nhận {{ getRegisterReportName(status) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";

import {
  getRegisterReportName,
  getRegisterReportColor,
} from "@/utils/getRegisterStatusName";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { RegisterReportEnum } from "@/apis/models/RegisterReportEnum";

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["registered", "cancel"]);

const props = defineProps<{
  isShow: boolean;
  topic: TopicDetails;
  status: RegisterReportEnum;
}>();

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleRegisterReport = async () => {
  try {
    await API.put(`/report/register`, {
      status: props.status,
      topicId: props.topic._id,
      studentId: user.value?._id,
    });

    toast.success(
      `Đăng ký ${getRegisterReportName(props.status)} cho đề tài thành công!`
    );
    emit("registered");
  } catch (error: any) {
    toast.error(error.message);
  }
};
</script>

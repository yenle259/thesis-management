<template>
  <div>
    <v-dialog v-model="dialog" width="520px">
      <v-card class="rounded-lg pt-2 pb-2 px-2" v-click-outside="handleCancel">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1 text-h6 font-weight-semibold">
              {{
                ` ${statusText} sinh viên ${getRegisterReportName(
                  report.reportStatus.studentRegister
                )}`
              }}
            </span>

            <p class="font-light text-caption text-black">
              Xác nhận
              <span class="lowercase">{{ statusText }}</span>
              {{
                ` cho sinh viên ${getRegisterReportName(
                  report.reportStatus.studentRegister
                )}`
              }}
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <p class="mb-1" v-if="report.student.userId">
            <span class="text-subtitle-2">Mã số sinh viên: </span
            ><span class="uppercase">
              {{ report.student.userId }}
            </span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Tên sinh viên: </span
            ><span>
              {{ report.student.name }}
            </span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Đề tài: </span
            ><span v-if="report.topic.name">
              {{ report.topic.name }}
            </span>
            <span v-else>{{ topicInfo?.name }}</span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Học phần: </span
            ><span v-if="report.topic.module">
              {{ report.topic.module.name }}
            </span>
            <span v-else>
              {{ topicInfo?.module.name }}
            </span>
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn color="success" variant="tonal" @click="handleUpdateReview()">
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { ReportTopic } from "@/apis/models/ReportTopic";
import { TopicDetails } from "@/apis/models/TopicDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["cancel", "reviewed"]);

const props = defineProps<{
  isShow: boolean;
  report: ReportTopic;
  status: RegisterStatusEnum;
  topicInfo?: TopicDetails;
}>();

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const statusText = computed(() => {
  return props.status === RegisterStatusEnum.Approve
    ? "Phê duyệt"
    : "Không phê duyệt";
});

const handleUpdateReview = async () => {
  try {
    const { data: response } = await API.put(`/report/review`, {
      topicId: props.report._id,
      piConfirm: props.status,
    });

    toast.success(
      `Đã ${
        props.status === RegisterStatusEnum.Approve ? "phê duyệt" : "từ chối"
      } đăng ký ${getRegisterReportName(
        props.report.reportStatus.studentRegister
      )} của sinh viên`
    );
    emit("reviewed");
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>

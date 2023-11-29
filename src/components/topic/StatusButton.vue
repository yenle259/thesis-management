<template>
  <div>
    <v-btn
      id="menu"
      append-icon="mdi-chevron-down"
      class="self-center me-2 rounded-lg bg-white"
      variant="flat"
      :disabled="isDisabled"
      :color="actions?.color"
      >{{ actions?.label }}</v-btn
    >
    <v-menu activator="#menu" location="bottom">
      <v-list class="rounded-lg px-2" density="compact">
        <v-list-item
          v-for="item in actions?.actions"
          :key="item.title"
          :disabled="reportStatus.studentRegister === item.value"
          :append-icon="item.icon"
          :title="item.title"
          class="rounded-lg"
          @click="
            actions?.status === RegisterStatusEnum.Approve && item.value
              ? handleRegisterReport(item.value)
              : handleCancelModal()
          "
        >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { RegisterReportEnum } from "@/apis/models/RegisterReportEnum";
import { ReportStatus } from "@/apis/models/ReportTopic";

const emit = defineEmits(["cancel", "open", "register"]);

const props = defineProps<{
  status: RegisterStatusEnum;
  reportStatus: ReportStatus;
}>();

const actionList = [
  {
    status: RegisterStatusEnum.Pending,
    color: "warning",
    label: "Đang chờ duyệt",
    actions: [
      {
        icon: "mdi-minus-circle-outline",
        color: "red",
        title: "Hủy đăng ký",
        click: "handleCancelModal",
        value: null,
      },
    ],
  },
  {
    status: RegisterStatusEnum.Reject,
    color: "red",
    label: "Không được duyệt",
    actions: [
      {
        icon: "mdi-minus-circle-outline",
        color: "red",
        title: "Hủy đăng ký",
        value: null,
      },
    ],
  },
  {
    status: RegisterStatusEnum.Approve,
    color: "success",
    label: "Đã được duyệt",
    actions: [
      {
        icon: "mdi-minus-circle-outline",
        color: "orange",
        title: "Xin điểm I",
        value: RegisterReportEnum.Postpone,
      },
      {
        icon: "mdi-check-circle-outline",
        color: "green",
        title: "Xác nhận báo cáo",
        value: RegisterReportEnum.Report,
      },
    ],
  },
];

const actions = computed(() => {
  return actionList.find((item) => item.status === props.status);
});

const isDisabled = computed(() => {
  const {
    reportStatus: { piConfirm, studentRegister },
  } = { ...props };
  return (
    studentRegister === RegisterReportEnum.Report &&
    piConfirm === RegisterStatusEnum.Approve
  );
});

const handleCancelModal = () => {
  emit("open");
};

const handleRegisterReport = (status: RegisterReportEnum) => {
  emit("register", status);
};
</script>

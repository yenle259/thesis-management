<template>
  <div v-if="manage">
    <v-alert
      v-if="manage.isRegisterTopicTime"
      class="mx-6 my-1 py-2"
      closable
      close-label="Đóng thông báo"
      type="info"
      icon="mdi-check-circle"
      variant="tonal"
      >Danh sách đề tài đang được mở đăng ký. Thời gian đăng ký sẽ kết thúc vào
      lúc: {{ `${dateViFormat(manage.registerTopicTime.endAt, true)}` }}
      <div v-if="isLecturer" class="text-orange-accent-4">
        <span class="font-bold uppercase">Chú ý: </span>
        Trong thời gian mở đăng ký, <strong>Giảng viên</strong> không thể thay đổi các thông tin
        đề tài.
      </div>
    </v-alert>
    <v-alert
      v-if="isSetRegisterTopicTime"
      class="mx-6 my-1 py-2"
      closable
      close-label="Đóng thông báo"
      variant="tonal"
      type="warning"
    >
      Chưa đến thời điểm đăng ký đề tài,
      <span
        >danh sách đề tài sẽ được <span class="font-bold">mở đăng ký</span> vào
        khoảng thời gian:
        <p class="text-body-2">
          {{ `Từ: ${dateViFormat(manage.registerTopicTime.beginAt, true)}` }}
        </p>
        <p class="text-body-2">
          {{ `Đến: ${dateViFormat(manage.registerTopicTime.endAt, true)}` }}
        </p></span
      >
    </v-alert>
  </div>
</template>

<script lang="ts" setup>
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { isBefore } from "date-fns";

const props = defineProps<{
  manage: ManageRegisterTime;
  isLecturer?: boolean;
}>();

const isSetRegisterTopicTime = computed(() => {
  return isBefore(
    new Date(Date.now()),
    new Date(props.manage.registerTopicTime.beginAt)
  );
});
</script>

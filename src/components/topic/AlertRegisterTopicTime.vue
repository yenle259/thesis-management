<template>
  <div v-if="manage">
    <v-alert
      v-if="manage.isRegisterTopicTime"
      class="mx-6 my-1 py-2"
      closable
      close-label="Đóng thông báo"
      type="info"
      variant="tonal"
      prominent
      >Danh sách đề tài đang được mở đăng ký. Thời gian đăng ký sẽ kết thúc vào
      lúc: {{ `${dateViFormat(manage.registerTopicTime.endAt, true)}` }}
    </v-alert>
    <v-alert
      v-if="isSetRegisterTopicTime"
      class="mx-6 my-1 py-2"
      closable
      close-label="Đóng thông báo"
      variant="tonal"
      type="warning"
      prominent
    >
      Chưa đến thời điểm đăng ký đề tài.
      <span
        >Danh sách đề tài sẽ được <span class="font-bold">mở đăng ký</span> vào
        thời gian:
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

const props = defineProps<{ manage: ManageRegisterTime }>();

const isSetRegisterTopicTime = computed(() => {
  return isBefore(
    new Date(Date.now()),
    new Date(props.manage.registerTopicTime.beginAt)
  );
});
</script>

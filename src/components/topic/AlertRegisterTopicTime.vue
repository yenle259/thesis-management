<template>
  <div v-if="manage">
    <!-- Message at register TOPIC time -->
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
        Trong thời gian mở đăng ký đề tài, <strong>Giảng viên</strong> không thể
        thay đổi các thông tin đề tài.
      </div>
    </v-alert>

    <!-- Message for upcoming register TOPIC time -->
    <v-alert
      v-if="isSetRegisterTopicTime"
      class="mx-6 my-1 py-2"
      closable
      close-label="Đóng thông báo"
      variant="tonal"
      icon="mdi-clock-check-outline"
      type="warning"
    >
      <span
        >Danh sách đề tài sẽ được <span class="font-bold">mở đăng ký</span> vào
        khoảng thời gian:
        <p class="text-body-2">
          {{ `Từ:  ${dateViFormat(manage.registerTopicTime.beginAt, true)}` }}
        </p>
        <p class="text-body-2">
          {{ `Đến:  ${dateViFormat(manage.registerTopicTime.endAt, true)}` }}
        </p></span
      >
    </v-alert>

    <!-- Message at register REPORT time -->
    <v-alert
      v-if="manage.isReportTime"
      class="mx-6 my-1 py-2"
      closable
      close-label="Đóng thông báo"
      type="info"
      icon="mdi-check-circle"
      variant="tonal"
      >Thời gian <strong>đăng ký báo cáo</strong> đang được mở và sẽ kết thúc
      vào lúc:
      {{ `${dateViFormat(manage.registerReportTime.endAt, true)}` }}
      <div v-if="isLecturer">
        <!-- <span class="font-bold uppercase">Chú ý: </span> -->
        Trong thời gian đăng ký báo cáo, Giảng viên có thể thực hiện phê duyệt
        các đăng ký báo cáo của sinh viên.
      </div>
      <div v-if="isStudent">
        <!-- <span class="font-bold uppercase">Chú ý: </span> -->
        Sinh viên có thể thực hiện đăng ký báo cáo cho các đề tài đang thực
        hiện.
      </div>
    </v-alert>
  </div>
</template>

<script lang="ts" setup>
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { isBefore } from "date-fns";

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{
  manage: ManageRegisterTime;
  isLecturer?: boolean;
  isStudent?: boolean;
}>();

const isSetRegisterTopicTime = computed(() => {
  return isBefore(
    new Date(Date.now()),
    new Date(props.manage.registerTopicTime.beginAt)
  );
});
</script>

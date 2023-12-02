<template>
  <div>
    <div class="py-2">
      <div class="flex justify-between gap-x-2"></div>
      <v-divider> </v-divider>
      <v-card class="overflow-hidden rounded-lg mx-1" width="800px">
        <v-table>
          <thead class="font-bold">
            <tr>
              <th class="text-left indent-4 text-overline">Đề tài</th>
              <th class="text-center">
                <span class="text-overline"> Đăng ký Báo cáo </span>
                <p class="text-xs">SV đăng ký | Trạng thái phê duyệt</p>
              </th>
            </tr>
          </thead>
          <tbody v-if="topics">
            <tr
              v-for="({ topic, student, reportStatus }, index) in topics"
              :key="index"
            >
              <td width="550px">
                <v-tooltip
                  text="Click vào để cập nhật thông tin"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      class="text-left py-1 my-2 rounded-lg"
                      @click="handleOpenEditForm(topic)"
                      v-bind="props"
                    >
                      <p>
                        <v-chip
                          size="small"
                          label
                          :color="getTopicModuleColor(topic.module.moduleId)"
                        >
                          {{ topic.module.name }}
                        </v-chip>
                      </p>
                      <p class="font-weight-medium text-body-1">
                        {{ topic.name }}
                      </p>
                      <div
                        class="d-flex flex-row gap-x-1 text-blue-grey-lighten-1 text-sm"
                      >
                        <span class="text-subtitle-2">Sinh viên </span>
                        <v-divider vertical thickness="3"></v-divider>
                        <div>
                          <p class="text-grey-800 text-sm">
                            {{ student.name }}
                          </p>
                        </div>
                      </div>
                      <div class="text-grey text-sm"></div>
                    </v-list-item>
                  </template>
                </v-tooltip>
              </td>
              <td class="w-56 text-center">
                <span v-if="reportStatus">
                  <v-btn
                    width="85px"
                    variant="tonal"
                    label
                    class="rounded-e-0 non-click"
                    :ripple="false"
                    :color="
                      getRegisterReportColor(reportStatus.studentRegister)
                    "
                  >
                    {{
                      getRegisterReportShortName(reportStatus.studentRegister)
                    }}
                  </v-btn>
                  <v-divider vertical thickness="2"></v-divider>
                  <v-tooltip location="right">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        :id="`review-menu-${index}`"
                        :color="getStatusColor(reportStatus.piConfirm)"
                        v-bind="props"
                        variant="tonal"
                        class="rounded-s-0 ps-1"
                        min-width="34px"
                      >
                        <v-icon
                          end
                          size="26"
                          :icon="getPiConfirmIcon(reportStatus.piConfirm)"
                        ></v-icon>
                      </v-btn>
                    </template>
                    <p>{{ getPiConfirmLabel(reportStatus.piConfirm) }}</p>
                  </v-tooltip>

                  <v-menu
                    :activator="`#review-menu-${index}`"
                    location="bottom end"
                  >
                    <v-list density="compact" class="rounded-lg">
                      <v-list-item
                        class="rounded-lg mx-2"
                        :disabled="
                          reportStatus.piConfirm === RegisterStatusEnum.Approve
                        "
                        @click="
                          handleReviewReport(
                            topics[index],
                            RegisterStatusEnum.Approve
                          )
                        "
                      >
                        <v-list-item-title>Phê duyệt</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        class="rounded-lg mx-2"
                        :disabled="
                          reportStatus.piConfirm === RegisterStatusEnum.Reject
                        "
                        @click="
                          handleReviewReport(
                            topics[index],
                            RegisterStatusEnum.Reject
                          )
                        "
                      >
                        <v-list-item-title>Từ chối</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
                <span v-else class="text-caption">Chưa đăng ký</span>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div v-if="topics.length == 0">
          <p class="py-3 italic text-center">Không có đề tài</p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { ReportTopic } from "@/apis/models/ReportTopic";

import {
  getRegisterReportShortName,
  getPiConfirmIcon,
  getPiConfirmLabel,
} from "@/utils/getRegisterStatusName";

const emit = defineEmits(["review", "open", "delete"]);

defineProps<{
  topics: ReportTopic[];
}>();

const handleOpenEditForm = (selectedTopic: TopicDetails) => {
  emit("open", selectedTopic);
};

const handleReviewReport = (
  selectedReport: ReportTopic,
  status: RegisterStatusEnum
) => {
  emit("review", selectedReport, status);
};
</script>
<style scoped>
.non-click {
  pointer-events: none;
}
</style>

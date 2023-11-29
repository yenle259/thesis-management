<template>
  <v-card v-if="reports" class="rounded-lg">
    <v-table>
      <thead class="font-bold">
        <tr>
          <th class="text-left text-overline">Giảng viên</th>
          <th class="text-left text-overline">Sinh viên</th>
          <th class="text-left text-overline">Tên đề tài</th>
          <th class="text-center">
            <span class="text-overline"> Đăng ký Báo cáo </span>
            <p class="text-xs">SV đăng ký | Trạng thái phê duyệt</p>
          </th>
          <th class="text-left text-overline">Báo cáo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-sm"
          v-for="({ pi, student, topic, reportStatus }, index) in reports"
          :key="index"
        >
          <td>
            <v-list-item class="rounded-lg w-38">
              <p class="text-grey-800 text-xs">
                {{ pi.name }}
              </p>
              <p class="text-caption text-xs text-grey">
                {{ pi.email }}
              </p>
            </v-list-item>
          </td>
          <td>
            <v-list-item class="rounded-lg w-38" v-if="student">
              <p class="text-grey-800 text-xs">
                {{ student.name }}
              </p>
              <p class="text-caption text-xs text-grey">
                {{ student.email }}
              </p>
            </v-list-item>
          </td>
          <td>
            <p
              size="small"
              variant="text"
              class="text-xs py-1"
              label
              :class="`text-${getTopicModuleColor(topic.module.moduleId)}`"
            >
              {{ topic.module.moduleId + " | " + topic.module.name }}
            </p>

            <p class="text-body-2">
              {{ topic.name }}
            </p>
          </td>
          <td class="text-center">
            <span v-if="reportStatus">
              <v-btn
                size="small"
                width="85px"
                variant="tonal"
                label
                class="rounded-e-0 non-click"
                :ripple="false"
                :color="getRegisterReportColor(reportStatus.studentRegister)"
              >
                {{ getRegisterReportShortName(reportStatus.studentRegister) }}
              </v-btn>
              <v-divider vertical thickness="3"></v-divider>
              <v-tooltip text="Click vào để cập nhật thông tin" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    :id="`review-menu-${index}`"
                    :color="getStatusColor(reportStatus.piConfirm)"
                    variant="tonal"
                    class="rounded-s-0 ps-1"
                    min-width="34px"
                    size="small"
                    v-bind="props"
                  >
                    <v-icon
                      end
                      size="22"
                      :icon="reportStatusIcon(reportStatus.piConfirm)"
                    ></v-icon>
                  </v-btn>
                </template>
                <div>
                  <p>
                    SV đăng ký:
                    {{
                      getRegisterReportShortName(reportStatus.studentRegister)
                    }}
                  </p>
                  <p>
                    GV phê duyệt: {{ getStatusLabel(reportStatus.piConfirm) }}
                  </p>
                </div>
              </v-tooltip>
            </span>
            <span v-else class="text-caption">Chưa đăng ký</span>
          </td>
          <td>{{ reportStatusLabel(reportStatus) }}</td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="reports.length === 0" class="text-body-2 text-center my-4">
      Không có đề tài
    </div>
    <div v-if="reports.length !== 0">
      <slot name="pagination"></slot>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { ReportStatus, ReportTopic } from "@/apis/models/ReportTopic";
import {
  getRegisterReportShortName,
  getPiConfirmIcon,
} from "@/utils/getRegisterStatusName";

defineProps<{ reports: ReportTopic[] }>();

const reportStatusIcon = (piConfirm: RegisterStatusEnum) => {
  return piConfirm === RegisterStatusEnum.Pending
    ? "mdi-progress-helper"
    : getPiConfirmIcon(piConfirm);
};

const reportStatusLabel = (reportStatus: ReportStatus) => {
  const { piConfirm, studentRegister } = reportStatus;
  return piConfirm === RegisterStatusEnum.Approve
    ? getRegisterReportShortName(studentRegister)
    : "Chưa có";
};
</script>

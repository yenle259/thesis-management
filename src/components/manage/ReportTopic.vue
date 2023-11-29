<template>
  <v-card v-if="reports" class="rounded-lg">
    <v-table>
      <thead class="font-bold text-overline">
        <tr>
          <th class="text-left">Giảng viên</th>
          <th class="text-left">Sinh viên</th>
          <th class="text-left">Tên đề tài</th>
          <th class="text-left">Phân loại đề tài</th>
          <th class="text-center">Đăng ký Báo cáo</th>
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
            {{ topic.name }}
          </td>
          <td>
            <v-chip
              :color="getTopicModuleColor(topic.module.moduleId)"
              size="small"
            >
              {{ topic.module.name }}
            </v-chip>
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
              <v-divider vertical thickness="2"></v-divider>
              <v-btn
                :id="`review-menu-${index}`"
                :color="getStatusColor(reportStatus.piConfirm)"
                variant="tonal"
                class="rounded-s-0 ps-1"
                min-width="34px"
                size="small"
              >
                <v-icon
                  end
                  size="26"
                  :icon="getPiConfirmIcon(reportStatus.piConfirm)"
                ></v-icon>
              </v-btn>
            </span>
            <span v-else class="text-caption">Chưa đăng ký</span>
          </td>
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
import { ReportTopic } from "@/apis/models/ReportTopic";
import {
  getRegisterReportShortName,
  getPiConfirmIcon,
} from "@/utils/getRegisterStatusName";

defineProps<{ reports: ReportTopic[] }>();
</script>

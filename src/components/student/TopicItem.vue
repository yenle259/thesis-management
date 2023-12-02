<template>
  <CustomCard
    :title="'Thông tin đăng ký'"
    :subTitle="'Học phần và đề tài đã đăng ký ở Học kì I (Năm học 2023 - 2024)'"
  >
    <template v-slot:content>
      <div v-if="module" class="mb-5">
        <v-card class="rounded-lg" max-width="870px">
          <v-table>
            <thead class="text-overline font-bold">
              <tr>
                <th class="w-96 indent-3">
                  <span>Học phần đăng ký </span>
                </th>
                <th class="text-center">Đề tài đăng ký tương ứng</th>
              </tr>
            </thead>
            <tbody v-if="module.moduleType">
              <tr
                v-for="(moduleId, index) in module.moduleType.split('-')"
                :key="index"
              >
                <th class="w-96">
                  <v-list-item v-if="moduleId" class="py-2">
                    <div class="mb-1">
                      <span class="text-body-2">Mã học phần: </span>
                      <v-chip
                        :color="getTopicModuleColor(moduleId)"
                        class="text-overline"
                      >
                        {{ moduleId }}
                      </v-chip>
                    </div>
                    <div>
                      <span class="text-body-2">Tên học phần: </span>

                      {{ getModuleName(moduleId) }}
                    </div>
                  </v-list-item>
                </th>
                <th>
                  <div v-if="topicRegistered(moduleId)" class="my-2">
                    <v-list-item
                      class="text-left py-3 rounded-lg hover:bg-white"
                      @click="
                        router.push(
                          '/user/topic/' + topicRegistered(moduleId)?.slug
                        )
                      "
                    >
                      <div class="text-xl pb-2 mb-2 border-b-2 border-dashed">
                        <v-chip
                          v-if="isSuggested(moduleId)"
                          label
                          size="small"
                          color="primary"
                          class="me-2"
                          >Đề xuất</v-chip
                        >{{ topicRegistered(moduleId)?.name }}
                      </div>
                      <div class="text-body-2 mb-2">
                        <span>Giảng viên: </span
                        >{{ topicRegistered(moduleId)?.pi.name }}
                      </div>
                      <div class="text-body-2 mb-1">
                        <span class="">Trạng thái: </span
                        ><span v-if="topicRegisteredStatus(moduleId)">
                          <v-chip
                            size="small"
                            class=""
                            :color="
                              getStatusColor(
                                topicRegisteredStatus(moduleId) ||
                                  RegisterStatusEnum.Pending
                              )
                            "
                          >
                            <v-icon
                              v-if="!isPending(moduleId)"
                              start
                              :icon="
                                isApproved(moduleId)
                                  ? 'mdi-check-circle'
                                  : 'mdi-minus-circle'
                              "
                            ></v-icon>
                            {{
                              getStatusLabel(
                                topicRegisteredStatus(moduleId) ||
                                  RegisterStatusEnum.Pending
                              )
                            }}</v-chip
                          >
                        </span>
                      </div>
                      <div class="text-body-2">
                        <v-tooltip location="bottom end">
                          <template v-slot:activator="{ props }">
                            <span v-if="getReports(moduleId)" v-bind="props">
                              <span v-if="getReports(moduleId)?.reportStatus">Đăng ký báo cáo: </span>
                              <span
                                v-if="
                                  getReports(moduleId)?.reportStatus
                                "
                              >
                                <v-btn
                                  size="small"
                                  width="80px"
                                  variant="tonal"
                                  label
                                  class="rounded-e-0 rounded-s-pill"
                                  :ripple="false"
                                  :color="
                                    getRegisterReportColor(
                                      getReports(moduleId)?.reportStatus
                                        .studentRegister ||
                                        RegisterReportEnum.Postpone
                                    )
                                  "
                                >
                                  {{
                                    getRegisterReportShortName(
                                      getReports(moduleId)?.reportStatus
                                        .studentRegister ||
                                        RegisterReportEnum.Postpone
                                    )
                                  }}
                                </v-btn>
                                <v-divider vertical thickness="3"></v-divider>
                                <v-btn
                                  :id="`review-menu-${index}`"
                                  :color="
                                    getStatusColor(
                                      getReportStatus(moduleId)?.piConfirm ||
                                        RegisterStatusEnum.Pending
                                    )
                                  "
                                  variant="tonal"
                                  class="rounded-s-0 ps-1 rounded-e-pill"
                                  min-width="30px"
                                  size="small"
                                  ><span class="text-caption"
                                    >{{
                                      getStatusLabel(
                                        getReportStatus(moduleId)?.piConfirm ||
                                          RegisterStatusEnum.Pending
                                      )
                                    }}
                                  </span>
                                  <span
                                    v-if="
                                      getReportStatus(moduleId)?.piConfirm ===
                                      RegisterStatusEnum.Pending
                                    "
                                  ></span>
                                  <v-icon
                                    v-else
                                    :ripple="false"
                                    end
                                    size="22"
                                    :icon="
                                      getPiConfirmIcon(
                                        getReportStatus(moduleId)?.piConfirm ||
                                          RegisterStatusEnum.Pending
                                      )
                                    "
                                  ></v-icon>
                                </v-btn>
                              </span>
                            </span>
                          </template>
                          <div>
                            <p>
                              Trạng thái đăng ký:
                              {{
                                getRegisterReportShortName(
                                  getReportStatus(moduleId)?.studentRegister ||
                                    RegisterReportEnum.Postpone
                                )
                              }}
                            </p>
                            <p>
                              Trạng thái phê duyệt:
                              {{
                                getStatusLabel(
                                  getReportStatus(moduleId)?.piConfirm ||
                                    RegisterStatusEnum.Pending
                                )
                              }}
                            </p>
                          </div>
                        </v-tooltip>
                      </div>
                    </v-list-item>
                  </div>
                  <div v-else class="text-body-2 text-center">
                    <v-list-item>
                      <span class="text-caption"> Chưa đăng ký đề tài </span>
                    </v-list-item>
                  </div>
                </th>
              </tr>
            </tbody>
          </v-table>
          <div
            v-if="!module || module.moduleType == ''"
            class="py-4 text-center font-italic text-body-2"
          >
            Chưa đăng ký học phần
          </div>
        </v-card>
      </div>
      <div v-else class="text-center">Chưa đăng ký đề tài</div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { RegisterModule } from "@/apis/models/RegisterModule";
import { ReportTopic } from "@/apis/models/ReportTopic";

import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { TopicStatusEnum } from "@/apis/models/TopicStatusEnum";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { RegisterReportEnum } from "@/apis/models/RegisterReportEnum";

import { getStatusLabel } from "@/utils/getStatusName";
import { getPiConfirmIcon } from "@/utils/getRegisterStatusName";

const { user } = storeToRefs(useAuthStore());

const router = useRouter();

const props = defineProps<{
  topics: TopicDetails[];
  module: RegisterModule;
  reports: ReportTopic[];
  modules: ModuleDetails[];
}>();

const getReports = (moduleId: string) => {
  return props.reports.find(({ topic }) => topic.module.moduleId === moduleId);
};

const getReportStatus = (moduleId: string) => {
  return props.reports.find(({ topic }) => topic.module.moduleId === moduleId)
    ?.reportStatus;
};

const topicRegistered = (moduleId: string) => {
  return props.topics.find(({ module }) => module.moduleId === moduleId);
};

const isSuggested = (moduleId: string) => {
  return topicRegistered(moduleId)?.status === TopicStatusEnum.SUGGESTED;
};

const isApproved = (moduleId: string) => {
  return topicRegisteredStatus(moduleId) === RegisterStatusEnum.Approve;
};

const isPending = (moduleId: string) => {
  return topicRegisteredStatus(moduleId) === RegisterStatusEnum.Pending;
};

const topicRegisteredStatus = (moduleId: string) => {
  return topicRegistered(moduleId)?.student.find(
    (item) => item.studentInfo._id === user.value?._id
  )?.status;
};

const getModuleName = (moduleId: string) => {
  const module = props.modules.find((module) => module.moduleId === moduleId);
  return module?.name;
};
</script>

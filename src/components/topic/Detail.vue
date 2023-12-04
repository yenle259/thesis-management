<template>
  <CustomCard v-if="topic">
    <template v-slot:header>
      <v-divider></v-divider>
      <p class="my-2 font-bold uppercase text-indigo text-lg tracking-wide">
        <span class="font-weight-medium pb-2 text-overline text-black"
          >Đề tài:
        </span>
        {{ topic?.name }}
      </p>
      <v-divider></v-divider>
    </template>
    <template v-slot:action>
      <slot name="action"></slot>
    </template>

    <template v-slot:content>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-3">
        <div class="col-span-2">
          <div
            class="mb-2"
            v-if="
              topic.student.find((item) => item.studentInfo._id === user?._id)
                ?.reason
            "
          >
            <v-alert
              variant="tonal"
              type="warning"
              v-if="
                topic.student.find((item) => item.studentInfo._id === user?._id)
                  ?.status !== RegisterStatusEnum.Approve
              "
            >
              <span class="font-bold"> Lí do không phê duyệt: </span>
              {{
                topic.student.find((item) => item.studentInfo._id === user?._id)
                  ?.reason
              }}
            </v-alert>
          </div>
          <v-card class="px-4 py-3 rounded-lg">
            <p
              class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
            >
              Thông tin đề tài
            </p>
            <hr />
            <div class="mt-3">
              <v-icon icon="mdi-filter-variant" class="me-2"></v-icon>
              <span class="font-weight-medium">Phân loại đề tài: </span>
              <v-chip
                v-if="topic.module"
                :color="getTopicModuleColor(topic.module.moduleId)"
              >
                {{ topic.module.moduleId + " | " + topic.module.name }}
              </v-chip>
              <v-chip v-else :color="getTopicTypeColor(topic?.type)">
                {{ getTopicTypeName(topic?.type) }}
              </v-chip>
            </div>
            <div class="my-2">
              <v-icon icon="mdi-account-multiple-outline" class="me-2"></v-icon>
              <span class="font-weight-medium">Số lượng sinh viên: </span>
              <span>
                {{ topic.numberOfStudent }}
              </span>
            </div>
            <div class="my-3">
              <v-icon icon="mdi-calendar-range" class="me-2"></v-icon>
              <span class="font-weight-medium">Học kì - Niên khóa: </span>
              <span v-if="topic.semester">
                {{ getSchoolYearSemester(topic.semester) }}
              </span>
            </div>
            <div class="my-3">
              <v-icon icon="mdi-text" class="me-2"></v-icon>
              <span class="font-weight-medium">Mô tả đề tài: </span>
              <br />
              <p class="px-3 leading-relaxed indent-7 mt-2 text-justify">
                {{ topic.description }}
              </p>
            </div>
          </v-card>
        </div>
        <div class="col-span-1 columns-1 gap-y-3">
          <div v-if="reports[0]">
            <div class="rounded-lg" v-if="reports[0].reportStatus">
              <v-card-text class="text-gray-700">
                <p
                  class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
                >
                  Đăng ký báo cáo
                </p>
                <hr />
                <div class="divide-y-2 divide-dashed divide-slate-150">
                  <div
                    variant="flat"
                    class="my-2 p-2"
                    v-for="({ reportStatus, student }, index) in reports"
                    :key="index"
                  >
                    <div class="my-1 gap-2">
                      <span>Sinh viên:</span>
                      <span class="ml-3 text-md font-bold">
                        {{ student.name }}
                      </span>
                    </div>
                    <div>
                      <span>Trạng thái:</span>
                      <span v-if="reportStatus">
                        <v-chip
                          v-if="reportStatus.studentRegister"
                          variant="text"
                          label
                          class="m1-2 ml-2 uppercase"
                          :color="
                            getRegisterReportColor(reportStatus.studentRegister)
                          "
                          >Đã đăng ký
                          {{
                            getRegisterReportName(reportStatus.studentRegister)
                          }}
                        </v-chip>
                      </span>

                      <span v-else class="mx-2 text-sm text-grey"
                        >Chưa đăng ký</span
                      >
                    </div>
                    <div>
                      <span class="me-2">Giảng viên phê duyệt:</span>
                      <span v-if="reportStatus">
                        <span v-if="reportStatus.studentRegister">
                          <v-btn
                            v-if="!user?.role"
                            size="small"
                            class="non-click"
                            :ripple="false"
                            variant="tonal"
                            label
                            :color="getStatusColor(reportStatus.piConfirm)"
                          >
                            {{ getStatusLabel(reportStatus.piConfirm) }}
                            <v-icon
                              end
                              v-if="
                                reportStatus.piConfirm !==
                                RegisterStatusEnum.Pending
                              "
                              >{{
                                getPiConfirmIcon(reportStatus.piConfirm)
                              }}</v-icon
                            > </v-btn
                          ><v-btn
                            v-if="
                              user?._id === topic.pi._id &&
                              reportStatus.studentRegister
                            "
                            :id="`review-menu-${index}`"
                            size="small"
                            variant="tonal"
                            label
                            :color="getStatusColor(reportStatus.piConfirm)"
                          >
                            {{ getStatusLabel(reportStatus.piConfirm) }}
                            <v-icon end>{{
                              getPiConfirmIcon(reportStatus.piConfirm)
                            }}</v-icon>
                          </v-btn>
                          <v-menu
                            :activator="`#review-menu-${index}`"
                            location="bottom end"
                          >
                            <v-list density="compact" class="rounded-lg">
                              <v-list-item
                                class="rounded-lg mx-2"
                                :disabled="
                                  reportStatus.piConfirm ===
                                  RegisterStatusEnum.Approve
                                "
                                @click="
                                  handleReviewReport(
                                    reports[index],
                                    RegisterStatusEnum.Approve,
                                    topic
                                  )
                                "
                              >
                                <v-list-item-title>Phê duyệt</v-list-item-title>
                              </v-list-item>
                              <v-list-item
                                class="rounded-lg mx-2"
                                :disabled="
                                  reportStatus.piConfirm ===
                                  RegisterStatusEnum.Reject
                                "
                                @click="
                                  handleReviewReport(
                                    reports[index],
                                    RegisterStatusEnum.Reject,
                                    topic
                                  )
                                "
                              >
                                <v-list-item-title>Từ chối</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </span>
                      </span>

                      <span v-else class="mx-2 text-sm text-grey"
                        >Không có dữ liệu</span
                      >
                    </div>
                  </div>
                </div>
              </v-card-text>
            </div>
          </div>

          <div class="rounded-lg">
            <v-card-text class="text-gray-700">
              <p
                class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
              >
                Giảng viên hướng dẫn
              </p>
              <hr />
              <div class="mt-2">
                <CustomLecturerItem :lecturer="topic.pi" />
              </div>
            </v-card-text>
          </div>
          <div class="rounded-lg">
            <v-card-text>
              <p
                class="mb-2 uppercase text-indigo tracking-wide font-weight-medium"
              >
                Sinh viên đăng ký
                <v-badge
                  color="indigo"
                  :content="topic.student.length + '/' + topic.numberOfStudent"
                  inline
                ></v-badge>
              </p>
              <hr />
              <div class="mt-2" v-if="topic.student.length !== 0">
                <div v-for="user in topic.student" :key="user.studentInfo._id">
                  <CustomUserItem :user="user.studentInfo || {}">
                    <template
                      v-slot:action
                      v-if="topic.pi._id === auth.user?._id"
                    >
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn
                            append-icon="mdi-chevron-down"
                            class="self-center me-2 bg-white"
                            variant="flat"
                            size="small"
                            :color="getStatusColor(user.status)"
                            v-bind="props"
                            :disabled="
                              user.status === RegisterStatusEnum.Approve
                            "
                          >
                            {{ getStatusName(user.status) }}
                          </v-btn>
                        </template>
                        <v-list class="rounded-lg px-2" density="compact">
                          <v-list-item
                            key="approve"
                            append-icon="mdi-check-circle-outline"
                            title="Phê duyệt"
                            class="rounded-lg"
                            @click="handleApprove(user)"
                          >
                          </v-list-item>
                          <v-list-item
                            key="reject"
                            append-icon="mdi-minus-circle-outline"
                            :disabled="
                              user.status === RegisterStatusEnum.Reject
                            "
                            title="Từ chối"
                            class="rounded-lg"
                            @click="handleReject(user)"
                          >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </CustomUserItem>
                </div>
              </div>
            </v-card-text>
          </div>
        </div>
      </div>
    </template>
  </CustomCard>
</template>

<script lang="ts" setup>
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { RegisterStudent } from "@/apis/models/RegisterStudent";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { ReportTopic } from "@/apis/models/ReportTopic";
import { getPiConfirmIcon } from "@/utils/getRegisterStatusName";

import { getTopicModuleColor } from "@/utils/getTopicModuleColor";

useTitle("QLĐT - Đề tài đăng ký");

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const emit = defineEmits(["approved", "reject", "review"]);

const props = defineProps<{
  topic: TopicDetails;
  reports: ReportTopic[];
}>();

const handleApprove = (user: RegisterStudent) => {
  emit("approved", user);
};
const handleReject = (user: RegisterStudent) => {
  emit("reject", user);
};

const handleReviewReport = (
  selectedReport: ReportTopic,
  status: RegisterStatusEnum,
  topicInfo: TopicDetails
) => {
  emit("review", selectedReport, status, topicInfo);
};
</script>

<style scoped>
.non-click {
  pointer-events: none;
}
</style>

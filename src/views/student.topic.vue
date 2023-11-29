<template>
  <TopicDetail
    v-if="topic && user"
    :topic="topic || {}"
    :reports="reports || []"
    @approved="handleApproveModal"
    @reject="handleRejectModal"
    @review="handleReportReview"
  >
    <template v-slot:action>
      <div
        v-if="
          topic.student
            .map(({ studentInfo: { _id } }) => _id)
            .includes(user._id)
        "
        class="d-flex flex-row justify-end gap-x-2"
      >
        <p class="text-overline self-center">Trạng thái</p>
        <TopicStatusButton
          :status="
            topic.student.find((item) => item.studentInfo._id === user?._id)
              ?.status
          "
          :report-status="reportStatus || {}"
          class="self-center"
          @open="handleCancelModal"
          @register="handleRegisterReport"
        />
      </div>
    </template>
  </TopicDetail>
  <TopicCancelRegistrationModal
    :isShow="isShowCancelModal"
    :topic="topic || {}"
    @cancel="handleCancelModal"
  />
  <TopicReviewModal
    :isShow="isShowApproveModal"
    :student="studentInfo || {}"
    :status="model.modalType"
    @cancel="isShowApproveModal = false"
    @updated="handleUpdated"
  />
  <TopicRegisterReportModal
    :isShow="model.isShowRegisterModal"
    :topic="topic || {}"
    :status="model.status || ''"
    @cancel="model.isShowRegisterModal = false"
    @registered="handleUpdated"
  />
  <TopicReviewReportModal
    :isShow="isShowReviewReportModal"
    :report="selectedReportTopic || {}"
    :status="reportReviewStatus || ''"
    :topicInfo="topicDetailInfo || {}"
    @reviewed="handleUpdateReview()"
    @cancel="isShowReviewReportModal = false"
  />
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { ReportStatus, ReportTopic } from "@/apis/models/ReportTopic";
import { RegisterStudent } from "@/apis/models/RegisterStudent";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { RegisterReportEnum } from "@/apis/models/RegisterReportEnum";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRoute } from "vue-router";

useTitle("QLĐT - Thông tin đề tài");

const { user } = storeToRefs(useAuthStore());

const route = useRoute();

const topicSlug = route.params.slug;

const topic = ref<TopicDetails>();

const reports = ref<ReportTopic[]>();

const reportStatus = ref<ReportStatus>();

const students = ref<RegisterStudent[]>();

const studentInfo = ref<RegisterStudent>();

const isShowCancelModal = ref(false);

const isShowApproveModal = ref(false);

const isShowReviewReportModal = ref(false);

const reportReviewStatus = ref<RegisterStatusEnum>(RegisterStatusEnum.Pending);

const selectedReportTopic = ref<ReportTopic>();

const topicDetailInfo = ref<TopicDetails>();

const model = reactive({
  modalType: "Approve",
  status: RegisterReportEnum.Postpone,
  isShowRegisterModal: false,
});

const getTopicDetails = async () => {
  try {
    const { data: response } = await API.get(`/topic/${topicSlug}`);
    topic.value = response.topic;
    students.value = topic.value?.student;

    reports.value = response.reports;
  } catch (error) {
    console.log(error);
  }
};

getTopicDetails();

const handleUpdated = () => {
  model.isShowRegisterModal = false;
  getTopicDetails();
};

const handleCancelModal = () => {
  isShowCancelModal.value = !isShowCancelModal.value;
};

const handleApproveModal = (student: RegisterStudent) => {
  isShowApproveModal.value = true;
  studentInfo.value = student;
  model.modalType = RegisterStatusEnum.Approve;
};

const handleRejectModal = (student: RegisterStudent) => {
  isShowApproveModal.value = true;
  studentInfo.value = student;
  model.modalType = RegisterStatusEnum.Reject;
};

const handleRegisterReport = (status: RegisterReportEnum) => {
  console.log(status);
  model.status = status;
  model.isShowRegisterModal = true;
};

//open report review modal
const handleReportReview = (
  selectedReport: ReportTopic,
  status: RegisterStatusEnum,
  topicInfo: TopicDetails
) => {
  selectedReportTopic.value = selectedReport;
  reportReviewStatus.value = status;
  topicDetailInfo.value = topicInfo;
  isShowReviewReportModal.value = !isShowReviewReportModal.value;
};

const handleUpdateReview = () => {
  isShowReviewReportModal.value = false;
  getTopicDetails();
};
</script>

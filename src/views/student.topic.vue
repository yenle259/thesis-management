<template>
  <TopicDetail
    v-if="topic && user"
    :topic="topic || {}"
    @approved="handleApproveModal"
    @reject="handleRejectModal"
  >
    <template v-slot:action>
      <div
        v-if="topic.student.map(({ _id }) => _id).includes(user._id)"
        class="d-flex flex-row justify-end gap-x-2"
      >
        <p class="text-overline self-center">Trạng thái</p>
        <TopicStatusButton
          :status="'Pending'"
          class="self-center"
          @open="handleCancelModal"
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
  />
</template>

<script lang="ts" setup>
import { BASE_API } from "@/constant";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useRoute } from "vue-router";
import { StudentDetails } from "@/apis/models/StudentDetails";
import { react } from "@babel/types";

useTitle("QLĐT - Thông tin đề tài");

const { user } = storeToRefs(useAuthStore());

const route = useRoute();

const topicSlug = route.params.slug;

const topic = ref<TopicDetails>();

const students = ref<UserDetails[]>();

const studentInfo = ref<StudentDetails>();

const isShowCancelModal = ref(false);

const isShowApproveModal = ref(false);

const isShowRejectModal = ref(false);

const model = reactive({
  modalType: "Approve",
});

axios({
  url: BASE_API + `/topic/${topicSlug}`,
  withCredentials: true,
})
  .then(function (res) {
    topic.value = res.data[0];
    students.value = topic.value?.student;
  })
  .catch(function (error) {
    console.log(error);
  });

const handleCancelModal = () => {
  isShowCancelModal.value = !isShowCancelModal.value;
};

const handleApproveModal = (student: StudentDetails) => {
  isShowApproveModal.value = true;
  studentInfo.value = student;
  model.modalType = "Approve";
};

const handleRejectModal = (student: StudentDetails) => {
  isShowApproveModal.value = true;
  studentInfo.value = student;
  model.modalType = "Reject";
};
</script>

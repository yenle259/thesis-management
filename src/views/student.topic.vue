<template>
  <TopicDetail
    v-if="topic && user"
    :topic="topic || {}"
    @approved="handleApproveModal"
    @reject="handleRejectModal"
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
import { RegisterStudent } from "@/apis/models/RegisterStudent";
import { RegisterStatusEnum } from "@/apis/models/RegisterStatusEnum";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useRoute } from "vue-router";

useTitle("QLĐT - Thông tin đề tài");

const { user } = storeToRefs(useAuthStore());

const route = useRoute();

const topicSlug = route.params.slug;

const topic = ref<TopicDetails>();

const students = ref<RegisterStudent[]>();

const studentInfo = ref<RegisterStudent>();

const isShowCancelModal = ref(false);

const isShowApproveModal = ref(false);

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
</script>

<template>
  <TopicDetail v-if="topic && user" :topic="topic || {}">
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
</template>

<script lang="ts" setup>
import { BASE_API } from "@/constant";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useRoute } from "vue-router";

useTitle("QLĐT - Đề tài đăng ký");

const { user } = storeToRefs(useAuthStore());

const route = useRoute();

const topicSlug = route.params.slug;

const topic = ref<TopicDetails>();

const students = ref<UserDetails[]>();

const isShowCancelModal = ref(false);

console.log(topic.value?.student[0]);

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
</script>

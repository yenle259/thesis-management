<template>
  <div class="px-6 pb-6 h-screen">
    <v-card variant="flat" class="py-6 px-8 h-4/5">
      <div>
        <div class="mb-4 flex justify-between">
          <v-chip class="text-overline" color="orange">Luận văn</v-chip>
          <div>
            <v-btn variant="tonal" color="red" @click="handleCancelModal"
              >Hủy đăng ký</v-btn
            >
            <v-btn class="mx-2" variant="tonal" color="warning"
              >Xin điểm I</v-btn
            >
            <v-btn variant="flat" color="blue">Xác nhận báo cáo</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <p class="my-2 font-bold uppercase text-blue-700 text-xl tracking-wide">
          <span class="font-bold pb-2 text-overline text-black">Đề tài: </span>
          {{ topic?.name }}
        </p>
        <v-divider></v-divider>
        <div class="my-2">
          <span class="font-bold">Giảng viên hướng dẫn: </span
          ><a class="text-blue-800" :href="'/lecturers/' + topic?.pi.userId">{{
            topic?.pi.name
          }}</a>
        </div>
        <p class="my-2">
          <span class="font-bold">Mô tả đề tài: </span>
          <span class="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </span>
        </p>
      </div>
    </v-card>
    <TopicCancelRegistrationModal
      :isShow="isShowCancelModal"
      :topic="topic || {}"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { BASE_API } from "@/constant";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const route = useRoute();
const topicSlug = route.params.slug;
console.log(topicSlug);

const topic = ref<TopicDetails>();

const isShowCancelModal = ref(false);

axios({
  url: BASE_API + `/topic/${topicSlug}`,
  withCredentials: true,
})
  .then(function (res) {
    topic.value = res.data[0];
  })
  .catch(function (error) {
    console.log(error);
  });

const handleCancelModal = () => {
  isShowCancelModal.value = !isShowCancelModal.value;
};
</script>

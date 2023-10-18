<template>
  <div class="px-6 pb-6 h-screen">
    <v-card variant="flat" class="py-6 px-8 h-4/5">
      <div v-if="topic">
        <div class="mb-4 flex justify-between">
          <v-chip class="text-overline" :color="getTopicTypeColor(topic?.type)">
            {{ getTopicTypeName(topic?.type) }}</v-chip
          >
          <div>
            <!-- <div>
              <v-btn variant="tonal" color="blue">Đăng ký</v-btn>
            </div> -->
          </div>
        </div>
        <v-divider></v-divider>
        <p class="my-2 font-bold uppercase text-blue-700 text-xl tracking-wide">
          <span class="font-bold pb-2 text-overline text-black">Đề tài: </span>
          {{ topic?.name }}
        </p>
        <v-divider></v-divider>
        <div class="my-2">
          <p class="uppercase font-bold mb-2 text-overline text-indigo">
            Thông tin giảng viên hướng dẫn
          </p>
          <div>
            <span class="font-bold">Giảng viên hướng dẫn: </span
            ><a
              class="text-blue-800"
              :href="'/lecturers/' + topic?.pi.userId"
              >{{ topic?.pi.name }}</a
            >
          </div>
          <div class="my-2">
            <span class="font-bold">Phân loại: </span>
            <v-chip size="small" :color="getTopicTypeColor(topic?.type)">
              {{ getTopicTypeName(topic?.type) }}
            </v-chip>
          </div>
        </div>
        <v-divider></v-divider>

        <div class="my-2">
          <p class="uppercase font-bold mb-2 text-overline text-indigo">
            Thông tin đề tài
          </p>
          <p class="">
            <span class="font-bold">Mô tả đề tài: </span>
            <span class="text-sm">
              {{ topic.description }}
            </span>
          </p>
        </div>
      </div>
    </v-card>
    <TopicCancelRegistrationModal
      :isShow="isShowCancelModal"
      :topic="topic || {}"
      @cancel="handleCancelModal"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { BASE_API } from "@/constant";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";

import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { getTopicTypeName } from "@/utils/getTopicTypeName";
import { UserDetails } from "@/apis/models/UserDetails";

import { useTitle } from "@vueuse/core";

const title = useTitle('QLĐT - Thông tin đề tài');

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

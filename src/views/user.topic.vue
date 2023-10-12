<template>
  <div class="h-screen">
    <TopicList :topics="topics ?? []" />
  </div>

  <AnnounceModal :isShow="isShow">
    <template v-slot:title> Thông báo </template>
    <template v-slot:content>
      Chưa đến thời điểm công bố danh sách đề tài. <br />Hãy quay lại sau
    </template>
  </AnnounceModal>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { PublishDate } from "@/apis/models/PublishDate";
import API from "@/apis/helpers/axiosBaseConfig";

import { parseISO } from "date-fns";

import { ref } from "vue";

import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { reactive } from "vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";

const topics = ref<TopicDetails[]>();

const isShow = ref(false);

const isPublish = ref(false);

const publishDate = ref<PublishDate>();

// const totalPages = ref<number>();

// const currentPage = ref<number[]>();

const getTopicList = async () => {
  try {
    const { data: response } = await API.get(`/topic`);
    topics.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getTopicList();

const getPublishDate = async () => {
  try {
    const { data: response } = await API.get(`/publish`);
    publishDate.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getPublishDate();

// const handlePublish = () => {
//   const recentDate = new Date(Date.now());
//   if (publishDate.value?.publishDate) {
//     console.log("co");
//     if (publishDate.value?.publishDate <= recentDate) {
//       isPublish.value = true;
//     }
//     console.log("cg");
//     console.log(publishDate.value?.publishDate <= recentDate);
//   }
// };

// handlePublish();

watch(
  () => publishDate.value?.publishDate,
  (value) => {
    const recentDate = new Date(Date.now());
    if (value) {
      if (new Date(value) <= recentDate) {
        isPublish.value = true;
        isShow.value = false;
      }
    } else {
      isPublish.value = false;
      isShow.value = true;
    }
  }
);
</script>

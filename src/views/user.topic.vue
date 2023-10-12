<template>
  <div class="h-screen">
    <TopicList :topics="topics ?? []" />
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import API from "@/apis/helpers/axiosBaseConfig";

import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

const topics = ref<TopicDetails[]>();

const publishDate = ref<Date>();

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
    publishDate.value = response.publishDate;
    // response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getPublishDate();
</script>

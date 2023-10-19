<template>
  <div v-if="publishDate">
    <AnnounceModal
      :publishDate="publishDate || {}"
      @is-published="handlePublish"
    >
      <template v-slot:title> Thông báo </template>
      <template v-slot:content>
        Chưa đến thời điểm đăng ký đề tài. Danh sách đề tài sẽ được mở đăng ký
        vào thời gian:
        {{ getFormatDate(new Date(publishDate.publishDate)) }}
      </template>
    </AnnounceModal>
  </div>
  <div class="h-screen">
    <TopicList :topics="topics ?? []" :is-publish="isShow"> </TopicList>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { PublishDate } from "@/apis/models/PublishDate";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

import { usePublishTopicList } from "@/stores/usePublishTopicList";
import { useAuthStore } from "@/stores/useAuthStore";

import { useTitle } from "@vueuse/core";

useTitle("QLĐT - Danh sách đề tài");

const { user } = storeToRefs(useAuthStore());

const topics = ref<TopicDetails[]>();

const isShow = ref(false);

const { change } = usePublishTopicList();

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

const handlePublish = (isPublish: boolean) => {
  change(isPublish);
  if (isPublish) {
    isShow.value = isPublish;
  }
};
</script>

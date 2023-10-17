<template>
  <div v-if="publishDate">
    <AnnounceModal
      :publishDate="publishDate || {}"
      @is-published="handlePublish"
    >
      <template v-slot:title> Thông báo </template>
      <template v-slot:content>
        Chưa đến thời điểm công bố danh sách đề tài. Danh sách đề tài sẽ công bố
        vào thời gian:
        {{ getFormatDate(new Date(publishDate.publishDate)) }}
      </template>
    </AnnounceModal>
  </div>
  <div class="h-screen">
    <TopicList :topics="topics ?? []" @is-publish="isShow">
      <template v-slot:tabmenu>
        </template
      >
    </TopicList>
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { PublishDate } from "@/apis/models/PublishDate";
import API from "@/apis/helpers/axiosBaseConfig";

import { ref, reactive } from "vue";

import { getFormatDate } from "@/utils/getFormatDate";
import { storeToRefs } from "pinia";
import { usePublishTopicList } from "@/stores/usePublishTopicList";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

const model = reactive({
  type: "LV",
});

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
    getTopicList();
    isShow.value = isPublish;
  } else {
    if (user.value?.role === UserRoleEnum.Admin) {
      getTopicList();
    }
  }
};
</script>

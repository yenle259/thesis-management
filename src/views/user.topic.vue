<template>
  <div v-if="publishDate">
    <v-alert
      v-if="!isShow"
      class="mx-6 my-1 py-2"
      closable
      close-label="Close Alert"
      variant="tonal"
      type="warning"
      prominent
    >
      Chưa đến thời điểm đăng ký đề tài. Danh sách đề tài sẽ được
      <span class="font-bold">mở đăng ký</span> vào thời gian:
      <span class="font-bold">{{
        getFormatDate(new Date(publishDate.publishDate))
      }}</span>
    </v-alert>
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
  <div class="h-screen" v-if="registerModule">
    <TopicList
      :title="'Danh sách đề tài'"
      :topics="currentSemesterTopics ?? []"
      :is-publish="isShow"
      :register-module="registerModule[0].moduleType"
    >
    </TopicList>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { PublishDate } from "@/apis/models/PublishDate";

import { usePublishTopicList } from "@/stores/usePublishTopicList";
import { useAuthStore } from "@/stores/useAuthStore";

useTitle("QLĐT - Danh sách đề tài");

const { user } = storeToRefs(useAuthStore());

const model = reactive({
  currentSemester: "s1b2023", //hk1-2023
});

const { registerModule } = storeToRefs(useStudentStore());

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

const currentSemesterTopics = computed(() => {
  return topics.value?.filter(
    ({ semester }) => semester.sysId === model.currentSemester
  );
});

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

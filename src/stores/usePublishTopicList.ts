import { ref } from "vue";
import { defineStore } from "pinia";
import { PublishDate } from "@/apis/models/PublishDate";

export const usePublishTopicList = defineStore(
  "publish",
  () => {
    const isPublish = ref<boolean>();
    const publishDate = ref<PublishDate>();

    function change() {
      isPublish.value = !isPublish.value;
    }

    return { isPublish, publishDate, change };
  },
  {
    persist: true,
  }
);

import { PublishDate } from "@/apis/models/PublishDate";

export const usePublishTopicList = defineStore(
  "publish",
  () => {
    const isPublish = ref<boolean>();
    const publishDate = ref<PublishDate>();

    function change(value: boolean) {
      isPublish.value = value;
    }

    return { isPublish, publishDate, change };
  },
  {
    persist: true,
  }
);

import { ref } from "vue";
import type { UserDetails } from "@/apis/models/UserDetails";
import { defineStore } from "pinia";

export const usePublishTopicList = defineStore(
  "publish",
  () => {
    const isPublish = ref<boolean>();

    function change() {
      isPublish.value = !isPublish.value;
    }

    return { isPublish, change };
  },
  {
    persist: true,
  }
);

import type { RegisterModule } from "@/apis/models/RegisterModule";
import { RegisteredTopic } from "@/apis/models/RegisteredTopic";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

export const useStudentStore = defineStore(
  "student",
  () => {
    const registerModule = ref<RegisterModule[]>();

    const registeredTopic = ref<string>();

    function reset() {
      const newRegisterModule = ref<RegisterModule[]>();
      const newRegisteredTopic = ref<RegisteredTopic[]>();
      registerModule.value = newRegisterModule.value;
      // registeredTopic.value = newRegisteredTopic.value;
    }

    function setId(topicType: TopicTypeEnum, topicId: string) {
      const object = { type: topicType, id: topicId };
    }

    return { registerModule, registeredTopic, reset, setId };
  },
  {
    persist: true,
  }
);

<template>
  <div class="px-4 mb-8">
    <div variant="flat" class="py-6 px-4">
      <div class="flex justify-between">
        <div>
          <span class="font-bold text-2xl pb-4 text-indigo">
            {{ props.title }}
          </span>
          <span> </span>
          <p class="font-light text-sm text-black text-caption">
            Danh sách đề tài học kì I (2023 -2024)
          </p>
        </div>
        <slot name="action"></slot>
      </div>
      <slot name="filter"></slot>
      <v-card class="mb-3 bg-white rounded-b-lg overflow-hidden">
        <div>
          <v-table>
            <thead class="font-bold text-overline">
              <tr>
                <th class="text-left">Tên đề tài</th>
                <th class="text-left">Học phần</th>
                <v-tooltip text="(SV đã đăng ký/Tổng SV)" location="top">
                  <template v-slot:activator="{ props }">
                    <th class="text-center" v-bind="props">Số SV</th>
                  </template></v-tooltip
                >
                <th class="text-left">Học kì - Năm học</th>
                <th class="text-center">Giảng viên</th>
                <th
                  class="text-left"
                  v-if="
                    isRegister && !registered?.includes(model.commonModuleType)
                  "
                >
                  Thực hiện
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-sm"
                v-for="topic in props.topics"
                :key="topic.slug"
              >
                <td
                  class="max-w-xs hover:text-blue-800 cursor-pointer"
                  @click="openInfoModal(topic)"
                >
                  {{ topic.name }}
                </td>
                <td>
                  <v-chip
                    :color="getTopicModuleColor(topic.module.moduleId)"
                    size="small"
                  >
                    {{ topic.module.name }}
                  </v-chip>
                </td>
                <td class="text-center">
                  <span v-if="topic.student">
                    {{ topic.student.length + "/" + topic.numberOfStudent }}
                  </span>
                  <span v-else>{{ "0/" + topic.numberOfStudent }}</span>
                </td>
                <td>
                  <div v-if="topic.semester">
                    {{ getSchoolYearSemester(topic.semester, true) }}
                  </div>
                </td>
                <td>
                  <v-list-item
                    class="rounded-lg w-38"
                    @click="router.push('/lecturers/' + topic.pi.userId)"
                  >
                    <p class="text-grey-800 text-xs">
                      {{ topic.pi.name }}
                    </p>
                    <p class="text-caption text-xs text-grey">
                      {{ topic.pi.email }}
                    </p>
                  </v-list-item>
                </td>
                <td
                  v-if="
                    isRegister && !registered.includes(model.commonModuleType)
                  "
                >
                  <div>
                    <v-btn
                      :key="topic._id"
                      color="info"
                      :disabled="handleDisabled(topic)"
                      variant="tonal"
                      class="ma-2"
                      @click="handleConfirmModal(topic)"
                      size="small"
                    >
                      Đăng ký
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div v-if="props.topics.length === 0">
            <p class="my-3 italic text-center text-caption">Không có đề tài</p>
          </div>
          <div v-if="props.topics.length !== 0">
            <slot name="pagination"></slot>
          </div>
        </div>
      </v-card>
    </div>
    <TopicInfoModal
      v-model="model.info"
      :isShow="model.info"
      :topic="openTopic || {}"
      :isRegister="isRegister"
      @cancel="model.info = false"
      @register="handleConfirmModal"
    />
    <TopicRegisterModal
      :isShow="isOpen"
      :topic="selectedTopic || {}"
      @cancel="isOpen = false"
      @registered="handleRegistered"
    />
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();

const { registeredTopic } = storeToRefs(useStudentStore());

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{
  topics: TopicDetails[];
  title: string;
  subTitle?: string;
  modules: ModuleDetails[];
  moduleSelected: string;
  isPublish?: boolean;
  registerModule: string;
  registered: string[];
}>();

const model = reactive({
  piId: "",
  info: false,
  commonModuleType: "",
});

const isOpen = ref(false);

const topicIdUpdated = ref<TopicDetails>();

const selectedTopic = ref<TopicDetails>();

const openTopic = ref<TopicDetails>();

watch(
  () => props.moduleSelected,
  () => {
    model.commonModuleType =
      props.modules.find((item) => item._id === props.moduleSelected)
        ?.moduleId || "";
  }
);

const isRegister = computed(() => {
  if (props.isPublish && props.registerModule) {
    return (
      props.registerModule.split("-").includes(model.commonModuleType) &&
      !props.registered.includes(model.commonModuleType)
    );
  } else {
    return false;
  }
});

const topics = computed(() => {
  return props.topics.filter(
    ({ module }) => module.moduleId === model.commonModuleType
  );
});

const lecturerOptions = computed(() => {
  return topics.value.map(({ pi }) => ({
    label: pi.name,
    value: pi._id,
  }));
});

const unique = computed(() => {
  return [
    ...new Map(
      lecturerOptions.value.map((item) => [item["label"], item])
    ).values(),
  ];
});

const openInfoModal = (topic: TopicDetails) => {
  model.info = true;
  openTopic.value = topic;
};

const handleDisabled = (topic: TopicDetails) => {
  return (
    topic.student?.length === topic.numberOfStudent ||
    topic._id === registeredTopic.value
  );
};

const handleConfirmModal = (topic: TopicDetails) => {
  isOpen.value = !isOpen.value;
  selectedTopic.value = topic;
};

//key value from emit 'registered'
const handleRegistered = (topic: TopicDetails) => {
  isOpen.value = false;
  topicIdUpdated.value = topic;
};
</script>

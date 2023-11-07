<template>
  <div class="px-4 mb-8">
    <div variant="flat" class="py-6 px-4">
      <div class="flex justify-between">
        <div>
          <span class="font-bold text-2xl pb-4 text-indigo">
            {{ props.title }}

            <v-chip size="small" color="indigo" variant="flat">{{
              props.topics.length
            }}</v-chip>
          </span>
          <span> </span>
          <p class="font-light text-sm text-black text-caption">
            Danh sách đề tài học kì I (2023 -2024)
          </p>
        </div>
        <div v-if="user?.role === UserRoleEnum.Admin">
          <ManagePublishTopicButton />
        </div>
        <slot name="action"></slot>
      </div>
      <v-tabs v-model="model.type" grow class="mt-2">
        <v-tab
          v-for="{ value, title } in topicTypeOptions"
          :key="value"
          :value="value"
          :active="model.type === value"
          :color="getTopicTypeColor(value)"
          class="rounded-t-lg"
          :variant="model.type === value ? 'text' : 'plain'"
          selected-class="text-white"
        >
          {{ title }}
          <span v-if="model.type === value">
            <v-badge
              text-color="white"
              :color="getTopicTypeColor(value)"
              :content="topics.length"
              inline
            ></v-badge
          ></span>
        </v-tab>
      </v-tabs>
      <v-card class="mb-3 bg-white rounded-b-lg overflow-hidden">
        <div>
          <v-table>
            <thead class="font-bold text-overline">
              <tr>
                <th class="text-left">Tên đề tài</th>
                <th class="text-left">Phân loại</th>
                <v-tooltip text="(SV đã đăng ký/Tổng SV)" location="top">
                  <template v-slot:activator="{ props }">
                    <th class="text-center" v-bind="props">Số SV</th>
                  </template></v-tooltip
                >
                <th class="text-left">Học kì - Năm học</th>
                <th class="text-center">
                  Giảng viên
                  <!-- <CustomFilterButton
                    :label="'Giảng viên'"
                    :options="unique"
                    @select="handleFilterLecturer"
                  /> -->
                </th>
                <th
                  class="text-left"
                  v-if="
                    isRegister && !registeredTopicType?.includes(model.type)
                  "
                >
                  Thực hiện
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-sm" v-for="topic in topics" :key="topic.slug">
                <td
                  class="max-w-xs hover:text-blue-800 cursor-pointer"
                  @click="openInfoModal(topic)"
                >
                  {{ topic.name }}
                </td>
                <td>
                  <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                    {{ getTopicTypeName(topic.type) }}
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
                    isRegister && !registeredTopicType?.includes(model.type)
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
          <v-divider></v-divider>
          <div v-if="topics.length >= 10" class="flex justify-end pb-1 px-1">
            <v-pagination
              v-model="page"
              :length="4"
              variant="text"
              rounded="circle"
              density="compact"
            ></v-pagination>
          </div>
          <v-divider></v-divider>
          <div v-if="topics.length === 0">
            <p class="my-3 italic text-center bg-white">Không có đề tài</p>
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
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

import { useAuthStore } from "@/stores/useAuthStore";

import { topicTypeOptions } from "@/components/form/data/topicTypeOptions";

const router = useRouter();

const { registeredTopic } = storeToRefs(useStudentStore());

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{
  title: string;
  subTitle?: string;
  topics: TopicDetails[];
  isPublish?: boolean;
  registerModule?: string;
  registeredTopicType?: TopicTypeEnum[];
}>();

const model = reactive({
  type: TopicTypeEnum.LV,
  piId: "",
  info: false,
});

const isOpen = ref(false);

const topicIdUpdated = ref<TopicDetails>();

const selectedTopic = ref<TopicDetails>();

const openTopic = ref<TopicDetails>();

const page = ref();

const isRegister = computed(() => {
  if (props.isPublish && props.registerModule) {
    return props.registerModule.split("-").includes(model.type);
  } else {
    return false;
  }
});

const topics = computed(() => {
  return props.topics.filter(({ type }) => type === model.type);
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

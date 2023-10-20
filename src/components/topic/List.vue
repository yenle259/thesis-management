<template>
  <div class="px-6 mb-8">
    <v-card variant="flat" class="py-6 px-8">
      <div class="flex justify-between">
        <p class="font-bold text-2xl pb-4 text-blue-700">
          DANH SÁCH ĐỀ TÀI ({{ topics.length }})
        </p>
        <div v-if="user?.role === UserRoleEnum.Admin">
          <ManagePublishTopicButton />
        </div>
      </div>
      <div class="py-2">
        <div>
          <v-tabs
            v-model="model.type"
            bg-color="transparent"
            color="basil"
            grow
          >
            <v-tab
              v-for="{ value, label } in topicTypeOptions"
              :key="value"
              :value="value"
              color="blue"
            >
              {{ label }}
            </v-tab>
          </v-tabs>
        </div>
      </div>
      <div class="py-3">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Tên đề tài</th>
              <th class="text-left">Phân loại</th>
              <v-tooltip text="(SV đã đăng ký/Tổng SV)" location="top">
                <template v-slot:activator="{ props }">
                  <th class="text-center" width="80px" v-bind="props">Số SV</th>
                </template></v-tooltip
              >
              <th class="text-left">MSCB</th>
              <th class="text-left">Giảng viên</th>
              <th class="text-left">Email</th>
              <th class="text-left" v-if="isRegister">Thực hiện</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-sm" v-for="topic in topics" :key="topic.slug">
              <td
                class="w-96 hover:text-blue"
                @click="() => router.push('/topic/' + topic.slug)"
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
              <td>{{ topic.pi.userId }}</td>
              <td>
                <v-chip size="small">
                  {{ topic.pi.name }}
                </v-chip>
              </td>
              <td>{{ topic.pi.email }}</td>
              <td v-if="isRegister">
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
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-divider></v-divider>
      </div>
      <div v-if="topics.length == 0">
        <p class="py-2 italic text-center">Không có đề tài</p>
      </div>
    </v-card>
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

import { useStudentStore } from "@/stores/useStudentStore";
import { useAuthStore } from "@/stores/useAuthStore";

import { topicTypeOptions } from "@/components/form/data/topicTypeOptions";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

// import { toast } from "vue3-toastify";
// import "vue3-toastify/dist/index.css";

// const { isPublish } = storeToRefs(usePublishTopicList());

const router = useRouter();

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{
  topics: TopicDetails[];
  isPublish?: boolean;
  registerModule?: string;
}>();

const model = reactive({
  type: TopicTypeEnum.LV,
});

const isOpen = ref(false);

const topicIdUpdated = ref<TopicDetails>();

const selectedTopic = ref<TopicDetails>();

const page = ref();

const isRegister = computed(() => {
  console.log(props.isPublish);
  if (props.isPublish && props.registerModule) {
    return props.registerModule.split("-").includes(model.type);
  } else {
    return false;
  }
});

const topics = computed(() => {
  return props.topics.filter(({ type }) => type === model.type);
});

const handleDisabled = (topic: TopicDetails) => {
  return topic.student?.length !== 0 || topicIdUpdated.value?._id === topic._id;
};

const handleConfirmModal = (topic: TopicDetails) => {
  isOpen.value = !isOpen.value;
  console.log(topic);
  selectedTopic.value = topic;
};

//key value from emit 'registered'
const handleRegistered = (topic: TopicDetails) => {
  isOpen.value = false;
  topicIdUpdated.value = topic;
};
</script>

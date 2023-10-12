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
      <div class="py-3" v-if="isPublish">
        <v-table :hover="true">
          <thead>
            <tr>
              <th class="text-left">Tên đề tài</th>
              <th class="text-left">Phân loại</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">Giảng viên</th>
              <th class="text-left">Email</th>
              <th class="text-left" v-if="user?.role === UserRoleEnum.Student">
                Thực hiện
              </th>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr class="text-sm" v-for="topic in props.topics" :key="topic.slug">
              <td>
                <a :href="'/topics/' + topic.slug">
                  {{ topic.name }}
                </a>
              </td>
              <td>
                <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                  {{ getTopicTypeName(topic.type) }}
                </v-chip>
              </td>
              <td>{{ topic.pi.userId }}</td>
              <td>{{ topic.pi.name }}</td>
              <td>{{ topic.pi.email }}</td>
              <td v-if="user?.role === UserRoleEnum.Student">
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
        <!-- <v-divider></v-divider>
        <div class="flex ">
          <v-pagination
            density="comfortable"
            v-model="page"
            :length="props.totalPages"
            rounded="circle"
            :uodate="handleUpdate"
          ></v-pagination>
        </div> -->
      </div>
      <div v-if="props.topics.length == 0">
        <p class="py-2 italic text-center">Không có đề tài</p>
      </div>
    </v-card>
    <TopicRegisterTopic
      :isShow="isOpen"
      :topic="selectedTopic || {}"
      @cancel="isOpen = false"
      @registered="handleRegistered"
    />
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";
import { ref } from "vue";
import { getTopicTypeName } from "@/utils/getTopicTypeName";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { usePublishTopicList } from "@/stores/usePublishTopicList";

const { isPublish } = storeToRefs(usePublishTopicList());

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{
  topics: TopicDetails[];
  // totalPages: number;
  // currentPage: number;
}>();

const isOpen = ref(false);

const topicIdUpdated = ref<TopicDetails>();

const selectedTopic = ref<TopicDetails>();

const page = ref();

const handleDisabled = (topic: TopicDetails) => {
  return !!topic.student || topicIdUpdated.value?._id === topic._id;
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

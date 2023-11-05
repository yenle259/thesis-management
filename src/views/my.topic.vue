<template>
  <!-- Topic Table of Lecturer -->
  <div v-if="user?.role === UserRoleEnum.Lecturer">
    <div>
      <div class="px-4 pb-6">
        <div variant="flat" class="py-6 px-4">
          <div class="flex justify-between">
            <div>
              <span class="font-bold text-2xl pb-2 text-blue-700">
                Đề tài của tôi
              </span>
              <p class="font-light text-sm text-black text-caption">
                Danh sách đề tài Học kì I (Năm học 2023 - 2024)
              </p>
            </div>
            <div class="flex flex-row">
              <v-btn
                variant="flat"
                append-icon="mdi-plus"
                @click="handleOpenCreateModal"
                color="indigo"
                class="rounded-lg"
                >Tạo đề tài</v-btn
              >
            </div>
          </div>
          <v-tabs v-model="model.topicStatusTab" class="mt-4">
            <v-tab
              v-for="({ title, label, value }, index) in TOPIC_STATUS"
              :key="index"
              :value="value"
              :title="title"
              hide-slider
              density="compact"
              class="rounded-xl me-1"
              color="indigo"
              :variant="model.topicStatusTab === value ? 'flat' : 'text'"
              >{{ label }}
            </v-tab>
          </v-tabs>
          <v-window v-model="model.topicStatusTab">
            <v-window-item key="pending" value="pending">
              <UserLecturerTopicTable
                :topics="topics ?? []"
                @updated-status="handleUpdated"
                @open="handleEditForm"
                @delete="handleDeleteModal"
              />
            </v-window-item>
            <v-window-item key="approved" value="approved">
              <TopicReportTable :topics="reportTopics || []" />
            </v-window-item>
            <v-window-item key="suggested" value="suggested"> </v-window-item>
          </v-window>

          <TopicCreateModal
            :is-show="isShowCreateModal"
            @cancel="handleOpenCreateModal"
            @created="handleCreatedTopic"
          />
          <TopicEditInfoModal
            :isShow="isShow"
            :edit-topic="editTopic || {}"
            @cancel="isShow = !isShow"
            @edited="handleEditedTopic"
          />
          <TopicDeleteModal
            :isShow="isShowDeleteModal"
            :delete-topic="deleteTopic || {}"
            @cancel="isShowDeleteModal = !isShowDeleteModal"
            @deleted="handleDeletedTopic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { TOPIC_STATUS } from "@/constants/tab";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Thông tin cá nhân");

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

const reportTopics = ref<TopicDetails[]>();

const editTopic = ref<TopicDetails>();

const deleteTopic = ref<TopicDetails>();

const isShow = ref(false);

const isShowCreateModal = ref(false);

const isShowDeleteModal = ref(false);

const model = reactive({
  topicStatusTab: TOPIC_STATUS[0].value,
  total: 0,
});

const urlByRole =
  user.value?.role === UserRoleEnum.Lecturer
    ? "/topic/lecturer" + `/${user.value?._id}`
    : "/topic/student" + `/${user.value?._id}`;

const getTopicList = async () => {
  try {
    const { data: response } = await API({
      url: urlByRole,
      withCredentials: true,
    });
    topics.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getTopicList();

const getReportTopics = async () => {
  try {
    const { data: response } = await API.get(
      `/report/lecturer/${user.value?._id}`
    );
    reportTopics.value = response.topics;
    model.total = response.total;
    return response;
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => model.topicStatusTab,
  () => {
    if (model.topicStatusTab === TOPIC_STATUS[1].value) {
      getReportTopics();
    }
  }
);

const handleUpdated = () => {
  getTopicList();
};

//create new topic
const handleOpenCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value;
};

const handleCreatedTopic = () => {
  toast.success("Thêm mới đề tài thành công");
  isShowCreateModal.value = !isShowCreateModal.value;
  getTopicList();
};

//handle edit topic
const handleEditForm = (selectedTopic: TopicDetails) => {
  editTopic.value = selectedTopic;
  isShow.value = !isShow.value;
};

const handleEditedTopic = () => {
  toast.success("Cập nhật đề tài thành công");
  isShow.value = !isShow.value;
  getTopicList();
};

//handle delete topic
const handleDeleteModal = (selectedTopic: TopicDetails) => {
  console.log(selectedTopic);
  deleteTopic.value = selectedTopic;
  isShowDeleteModal.value = !isShowDeleteModal.value;
};

const handleDeletedTopic = () => {
  toast.success("Xóa đề tài thành công");
  isShowDeleteModal.value = !isShowDeleteModal.value;
  getTopicList();
};
</script>
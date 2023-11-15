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
            <v-window-item
              :key="TopicStatusEnum.SUGGESTED"
              :value="TopicStatusEnum.SUGGESTED"
            >
              <UserLecturerTopicTable
                :topics="topics ?? []"
                @updated-status="handleUpdated"
                @open="handleEditForm"
                @delete="handleDeleteModal"
              />
            </v-window-item>
          </v-window>

          <TopicCreateModal
            :is-show="isShowCreateModal"
            :sys-options="sysOptions ?? []"
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
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { TopicStatusEnum } from "@/apis/models/TopicStatusEnum";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { TOPIC_STATUS } from "@/constants/tab";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Thông tin cá nhân");

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

const semesters = ref<SchoolYearSemester[]>();

const reportTopics = ref<TopicDetails[]>();

const editTopic = ref<TopicDetails>();

const deleteTopic = ref<TopicDetails>();

const isShow = ref(false);

const isShowCreateModal = ref(false);

const isShowDeleteModal = ref(false);

const model = reactive({
  topicStatusTab: TOPIC_STATUS[0].value,
  total: 0,
  status: "",
});

const getTopicList = async () => {
  try {
    const { data: response } = await API.get(
      `/topic/lecturer/${user.value?._id}`,
      {
        params:
          model.topicStatusTab === TopicStatusEnum.SUGGESTED
            ? { status: TopicStatusEnum.SUGGESTED }
            : {},
      }
    );
    topics.value = response.topics;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getTopicList();

// get data for semester options
const getSemesters = async () => {
  try {
    const { data: response } = await API.get(`/sys`);
    semesters.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getSemesters();

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

const sysOptions = computed(() => {
  return semesters.value?.map((item: any) => ({
    title: getSchoolYearSemester(item, true),
    value: item._id,
  }));
});

watch(
  () => model.topicStatusTab,
  () => {
    if (model.topicStatusTab === TOPIC_STATUS[2].value) {
      getReportTopics();
    } else if (model.topicStatusTab === TOPIC_STATUS[1].value) {
      model.status = TopicStatusEnum.SUGGESTED;
      getTopicList();
    } else {
      model.status = "";
      getTopicList();
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

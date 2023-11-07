<template>
  <!-- Common User Info -->
  <v-card
    class="mx-8 mt-6 rounded-lg"
    width="350px"
    v-if="user?.role !== UserRoleEnum.Lecturer"
  >
    <v-card-text>
      <CustomStudentInfoItem
        :title="'Thông tin cá nhân'"
        :student="user || {}"
      />
    </v-card-text>
  </v-card>

  <!-- Topic Table of Student -->
  <div v-if="!user?.role">
    <div v-if="topics?.length !== 0">
      <StudentTopic :topics="topics ?? []" />
    </div>
  </div>

  <!-- Topic Table of Lecturer -->
  <!-- <div v-if="user?.role === UserRoleEnum.Lecturer">
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

          <UserLecturerTopicTable
            :topics="topics ?? []"
            @updated-status="handleUpdated"
            @open="handleEditForm"
            @delete="handleDeleteModal"
          >
            <template v-slot:tab
              ><v-tabs v-model="model.tab" class="mt-2">
                <v-tab
                  v-for="({ title, label, value }, index) in TOPIC_STATUS"
                  :key="index"
                  :value="value"
                  :title="title"
                  hide-slider
                  density="compact"
                  class="rounded-xl me-1"
                  color="indigo"
                  :variant="model.tab === value ? 'flat' : 'text'"
                  >{{ label }}
                </v-tab>
              </v-tabs></template
            >
          </UserLecturerTopicTable>
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
  </div> -->
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

const editTopic = ref<TopicDetails>();

const deleteTopic = ref<TopicDetails>();

const isShow = ref(false);

const isShowCreateModal = ref(false);

const isShowDeleteModal = ref(false);

const model = reactive({
  tab: TOPIC_STATUS[0].value,
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

const getReportTopics = async () => {
  try {
    const { data: response } = await API.get(
      `/report/lecturer/${user.value?._id}`
    );
    // topics.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getTopicList();

watch(
  () => model.tab,
  () => {
    if (model.tab === TOPIC_STATUS[1].value) {
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
<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    const auth = useAuthStore();
    if (auth.user?.role === UserRoleEnum.Lecturer) {
      next("/my-topic");
    } else {
      next(true);
    }
  },
};
</script>

<template>
  <div>
    <UserInfo :title="'Thông tin cá nhân'" :user="user || {}" />
  </div>

  <!-- Topic Table of Student -->
  <div v-if="user?.role === UserRoleEnum.Student">
    <div v-if="topics?.length !== 0">
      <UserStudentTopic :topics="topics ?? []" />
    </div>
  </div>

  <!-- Topic Table of Lecturer -->
  <div v-if="user?.role === UserRoleEnum.Lecturer">
    <div>
      <div class="px-6 pb-6">
        <v-card variant="flat" class="py-6 px-8">
          <div class="flex justify-between">
            <p class="font-bold text-2xl pb-4 text-blue-700">
              DANH SÁCH ĐỀ TÀI
            </p>
            <v-btn
              variant="tonal"
              append-icon="mdi-plus"
              @click="handleOpenCreateModal"
              color="info"
              >Tạo đề tài</v-btn
            >
          </div>
          <TopicCreateModal
            
            :is-show="isShowCreateModal"
            @cancel="handleOpenCreateModal"
            @created="handleCreatedTopic"
          />
          <UserLecturerTopicTable
            :topics="topics ?? []"
            @edit="handleCreatedTopic"
            @updated-status="handleUpdated"
          />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

const urlByRole =
  "/topic/" + user.value?.role.toLocaleLowerCase() + `/${user.value?._id}`;

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

const isShowCreateModal = ref(false);

const handleUpdated = () => {
  getTopicList();
};

const handleOpenCreateModal = () => {
  isShowCreateModal.value = !isShowCreateModal.value;
};

const handleOpenEditTopic = (topic: TopicDetails) => {
  isShowCreateModal.value = !isShowCreateModal.value;
};

const handleCreatedTopic = () => {
  toast.success("Thêm mới đề tài thành công");
  isShowCreateModal.value = !isShowCreateModal.value;
  getTopicList();
};
</script>

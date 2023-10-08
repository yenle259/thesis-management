<template>
  <div>
    <UserInfo :title="'Thông tin cá nhân'" :user="user || {}" />
  </div>
  <div v-if="user?.role === UserRoleEnum.Student">
    <div v-if="topics?.length !== 0">
      <UserStudentTopic :topics="topics ?? []" />
    </div>
  </div>
  <div v-if="user?.role === UserRoleEnum.Lecturer">
    <div v-if="topics?.length !== 0">
      <UserLecturerTopic
        :topics="topics ?? []"
        @updated-status="handleUpdated"
      />
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

const handleUpdated = () => {
  getTopicList();
};
</script>

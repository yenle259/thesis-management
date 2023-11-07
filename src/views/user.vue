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
    <StudentTopic
      :topics="topics ?? []"
      :module="module || {}"
      :reports="reports ?? []"
    />
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { RegisterModule } from "@/apis/models/RegisterModule";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";

import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ReportTopic } from "@/apis/models/ReportTopic";

useTitle("QLĐT - Thông tin cá nhân");

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

const reports = ref<ReportTopic[]>();

const module = ref<RegisterModule>();

const getTopicList = async () => {
  try {
    const { data: response } = await API.get(
      `/topic/student/${user.value?._id}`
    );
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
      `/report/student/${user.value?._id}`
    );
    reports.value = response.topics;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getReportTopics();

const getRecentRegisterModule = async () => {
  try {
    const { data: response } = await API.get(
      `/student/module/${user.value?._id}`
    );
    module.value = response.module;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getRecentRegisterModule();
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

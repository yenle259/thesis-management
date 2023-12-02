<template>
  <!-- Common User Info -->
  <div v-if="manage">
    <TopicAlertRegisterTopicTime :manage="manage || {}" :isStudent="true" />
  </div>
  <v-card
    class="mx-8 mt-4 rounded-lg"
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

  <div v-if="!user?.role" class="mt-4">
    <StudentTopicItem
      :topics="topics ?? []"
      :module="module || {}"
      :reports="reports ?? []"
      :modules="modules ?? []"
    />
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { RegisterModule } from "@/apis/models/RegisterModule";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { ReportTopic } from "@/apis/models/ReportTopic";

import { useAuthStore } from "@/stores/useAuthStore";

import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";

useTitle("QLĐT - Thông tin cá nhân");

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

const reports = ref<ReportTopic[]>();

const manage = ref<ManageRegisterTime[]>();

const modules = ref<ModuleDetails[]>();

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

const getModules = async () => {
  try {
    const { data: response } = await API.get(`/module`);
    modules.value = response;

    return response;
  } catch (error) {
    console.log(error);
  }
};

getModules();

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

const getRegisterTopicTime = async () => {
  try {
    const { data: response } = await API.get(`/register-time`);

    manage.value = response;

    return response;
  } catch (error) {
    console.log(error);
  }
};

getRegisterTopicTime();
//student route
if (!user.value?.role) {
  getRecentRegisterModule();
}
</script>

<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    const auth = useAuthStore();
    if (auth.user?.role) {
      next("/my-topic");
    } else {
      next(true);
    }
  },
};
</script>

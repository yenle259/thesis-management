<template>
  <div v-if="manage">
    <TopicAlertRegisterTopicTime :manage="manage || {}" />
  </div>
  <div class="h-screen">
    <TopicList
      :title="'Danh sách đề tài'"
      :topics="topics ?? []"
      :modules="modules ?? []"
      :moduleSelected="model.module || ''"
      :is-publish="manage?.isRegisterTopicTime"
      :register-module="registerModule ? registerModule[0].moduleType : ''"
      :registered="registeredTopicModuleId || []"
      @create="isOpenSuggestModal = true"
    >
      <template v-slot:action>
        <div v-if="!user?.role">
          <v-tooltip text="Đề xuất đề tài muốn thực hiện" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                :disabled="!module?.moduleType || isDisabledSuggested"
                v-bind="props"
                variant="elevated"
                append-icon="mdi-plus"
                @click="isOpenSuggestModal = true"
                color="indigo"
                >Đề xuất đề tài</v-btn
              >
            </template>
          </v-tooltip>
        </div>
      </template>
      <template v-slot:filter>
        <v-tabs v-model="model.module" grow class="mt-2">
          <v-tab
            v-for="{ value, title, subvalue } in moduleOptions"
            :key="value"
            :value="value"
            :active="model.module === value"
            :color="getTopicModuleColor(subvalue)"
            class="rounded-t-lg"
            :variant="model.module === value ? 'text' : 'plain'"
          >
            {{ title }}
            <span v-if="model.module === value">
              <v-badge
                text-color="white"
                :color="getTopicModuleColor(subvalue)"
                :content="model.count"
                inline
              ></v-badge
            ></span>
          </v-tab>
        </v-tabs>
      </template>
      <template v-slot:pagination>
        <div class="d-flex justify-between px-2 py-3">
          <div class="d-flex flex-row gap-x-3">
            <p class="self-center indent-4 text-body-2">Hiển thị</p>
            <v-btn
              id="number-per-page"
              variant="tonal"
              append-icon="mdi-menu-down"
              >{{ model.numberOfItemsPerPage }}</v-btn
            >
            <v-menu activator="#number-per-page">
              <v-list density="compact">
                <v-list-item
                  density="compact"
                  v-for="(value, index) in PAGINATION_OPTIONS"
                  :key="index"
                  :value="value"
                  @click="model.numberOfItemsPerPage = value"
                >
                  {{ value }}
                </v-list-item>
              </v-list>
            </v-menu>
            <p class="self-center text-body-2">
              {{
                getPaginationText(
                  model.count,
                  model.numberOfItemsPerPage,
                  model.page
                )
              }}
            </p>
          </div>
          <v-pagination
            v-model="model.page"
            :length="model.totalsPage"
            :total-visible="5"
            active-color="blue"
            variant="text"
            density="compact"
          ></v-pagination>
        </div>
      </template>
    </TopicList>
  </div>
  <TopicSuggestModal
    :isShow="isOpenSuggestModal"
    :register-module="module || {}"
    :lecturers="lecturers || []"
    :modules="modules || []"
    :registered="registeredTopics || []"
    @cancel="isOpenSuggestModal = false"
    @suggested="handleSuggestedTopic"
  />
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { RegisterModule } from "@/apis/models/RegisterModule";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";

import { useAuthStore } from "@/stores/useAuthStore";
import { PAGINATION_OPTIONS } from "@/constant";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Danh sách đề tài đăng ký");

const { user } = storeToRefs(useAuthStore());

const model = reactive({
  currentSemester: "s1b2023", //hk1-2023
  module: "654fd81877f71c8576f9a337",
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
});

const { registerModule } = storeToRefs(useStudentStore());

const module = ref<RegisterModule>();

const topics = ref<TopicDetails[]>();

const manage = ref<ManageRegisterTime>();

const lecturers = ref<UserDetails[]>();

const modules = ref<ModuleDetails[]>();

const registeredTopics = ref<TopicDetails[]>();

const isOpenSuggestModal = ref(false);

const getTopicList = async () => {
  try {
    const { page, numberOfItemsPerPage, module } = model;
    const { data: response } = await API.get(`/topic`, {
      params: {
        page,
        limit: numberOfItemsPerPage,
        module: module !== null ? module : null,
      },
    });
    topics.value = response.topics;
    model.page = response.currentPage;
    model.count = response.count;
    model.totalsPage = response.totalPages;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getTopicList();

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

//role: student -> get register module of recent semester
if (!user.value?.role) {
  getRecentRegisterModule();
}

const getRegisteredTopic = async () => {
  try {
    const { data: response } = await API.get(
      "/topic/student" + `/${user.value?._id}`
    );
    registeredTopics.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getRegisteredTopic();

const getLecturers = async () => {
  try {
    const { data: response } = await API.get("/user/lecturers");
    lecturers.value = response.lecturers;
  } catch (error) {
    console.log(error);
  }
};

getLecturers();

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

watch(
  () => [model.module, model.numberOfItemsPerPage, model.page],
  () => {
    if (model.module) {
      getTopicList();
    }
  },
  { immediate: true }
);

const moduleOptions = computed(() => {
  return modules.value?.map(({ moduleId, name, _id }) => ({
    title: moduleId + " | " + name,
    value: _id,
    subvalue: moduleId,
  }));
});

const registeredTopicModuleId = computed(() => {
  return registeredTopics.value?.map(({ module }) => module.moduleId);
});

const isDisabledSuggested = computed(() => {
  return (
    registeredTopics.value?.length ===
      module.value?.moduleType.split("-").length ||
    !manage.value?.isRegisterTopicTime
  );
});

const handleSuggestedTopic = () => {
  isOpenSuggestModal.value = false;
  toast.success(`Đã đề xuất đề tài với giảng viên`);
  getRegisteredTopic();
};
</script>

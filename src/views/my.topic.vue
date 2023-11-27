<template>
  <!-- Topic Table of Lecturer -->
  <div v-if="manage">
    <TopicAlertRegisterTopicTime :manage="manage || {}" :isLecturer="true" />
  </div>
  <div v-if="user?.role" class="min-h-full">
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
                :count="model.count"
                :modules="modules || []"
                :sys-options="sysOptions ?? []"
                :manage="manage || {}"
                @updated-status="handleUpdated"
                @open="handleEditForm"
                @delete="handleDeleteModal"
              >
                <template v-slot:filter>
                  <div class="d-flex gap-x-2">
                    <div class="flex flex-row content-center p-2">
                      <p><v-icon>mdi-filter-variant</v-icon></p>
                    </div>
                    <div class="w-52">
                      <v-autocomplete
                        v-model="model.filterModule"
                        :items="moduleOptions"
                        clearable
                        chips
                        label="Học phần"
                        variant="outlined"
                        density="compact"
                        class="rounded-lg"
                      ></v-autocomplete>
                    </div>
                    <div class="w-60">
                      <v-autocomplete
                        v-model="model.filterSemester"
                        :items="sysOptions"
                        variant="outlined"
                        density="compact"
                        label="HK - Năm học"
                        clearable
                        chips
                      ></v-autocomplete>
                    </div>
                  </div>
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
                      <v-divider vertical thickness="2"></v-divider>
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
              </UserLecturerTopicTable>
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
                :modules="modules || []"
                @updated-status="handleUpdated"
                @open="handleEditForm"
                @delete="handleDeleteModal"
              />
            </v-window-item>
          </v-window>
          <TopicCreateModal
            :is-show="isShowCreateModal"
            :sys-options="sysOptions ?? []"
            :modules="modules || []"
            @cancel="handleOpenCreateModal"
            @created="handleCreatedTopic"
          />
          <TopicEditInfoModal
            :isShow="isShow"
            :modules="modules || []"
            :edit-topic="editTopic || {}"
            :sys-options="sysOptions ?? []"
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
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { TopicStatusEnum } from "@/apis/models/TopicStatusEnum";
import { PAGINATION_OPTIONS } from "@/constant";
import { TOPIC_STATUS } from "@/constants/tab";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Thông tin cá nhân");

const auth = useAuthStore();

const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

const semesters = ref<SchoolYearSemester[]>();

const modules = ref<ModuleDetails[]>();

const manage = ref<ManageRegisterTime[]>();

const reportTopics = ref<TopicDetails[]>();

const editTopic = ref<TopicDetails>();

const deleteTopic = ref<TopicDetails>();

const isShow = ref(false);

const isShowCreateModal = ref(false);

const isShowDeleteModal = ref(false);

const model = reactive({
  topicStatusTab: TOPIC_STATUS[0].value,
  total: 0,
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
  status: "",
  filterModule: null,
  filterSemester: null,
});

const getTopicList = async () => {
  try {
    const { data: response } = await API.get(
      `/topic/lecturer/${user.value?._id}`,
      {
        params: {
          page: model.page,
          limit: model.numberOfItemsPerPage,
          status:
            model.topicStatusTab === TopicStatusEnum.SUGGESTED
              ? TopicStatusEnum.SUGGESTED
              : null,
          module: model.filterModule,
          semester: model.filterSemester,
        },
      }
    );
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

// get data for semester options
const getSemesters = async () => {
  try {
    const { data: response } = await API.get(`/sys`, {
      params: { isMain: true },
    });
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

const sysOptions = computed(() => {
  return semesters.value?.map((item: any) => ({
    title: getSchoolYearSemester(item),
    value: item._id,
  }));
});

const moduleOptions = computed(() => {
  return modules.value?.map(({ _id, moduleId, name }) => ({
    title: moduleId + " | " + name,
    value: _id,
    subvalue: moduleId,
  }));
});

const topicsData = computed(() => {
  return topics.value;
});

watch(
  () => model.topicStatusTab,
  () => {
    if (model.topicStatusTab === TOPIC_STATUS[2].value) {
      getReportTopics();
    } else if (model.topicStatusTab === TOPIC_STATUS[1].value) {
      model.status = TopicStatusEnum.SUGGESTED;
      model.filterModule = null;
      model.filterSemester = null;
      getTopicList();
    } else {
      getTopicList();
    }
  }
);

watch(
  () => topicsData,
  () => {
    console.log(topicsData);
  }
);

watch(
  () => [
    model.numberOfItemsPerPage,
    model.page,
    model.filterModule,
    model.filterSemester,
  ],
  () => {
    if (pagesCount(model.count, model.numberOfItemsPerPage) < model.page) {
      model.page = 1;
    }
    getTopicList();
  },
  { immediate: true }
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
  model.numberOfItemsPerPage = 10;
  model.numberOfItemsPerPage = 7;
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
  setTimeout(() => getTopicList(), 1000);
};
</script>

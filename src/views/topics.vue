<template>
  <div class="h-screen">
    <TopicTable
      :title="'Danh sách đề tài'"
      :modules="modules ?? []"
      :topics="topics || []"
      :moduleSelected="model.module || ''"
      :is-publish="manage?.isRegisterTopicTime"
      @create="isOpenSuggestModal = true"
    >
      <template v-slot:action> </template>
      <template v-slot:filter>
        <div class="d-flex gap-x-2 justify-end">
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
              v-model="model.filterLecturer"
              :items="lecturerOptions"
              variant="outlined"
              density="compact"
              label="Giảng viên"
              clearable
              chips
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item?.title"
                  :subtitle="item.raw.subtitle"
                ></v-list-item> </template
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
    </TopicTable>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { PAGINATION_OPTIONS } from "@/constant";

useTitle("QLĐT - Danh sách đề tài");

const model = reactive({
  page: 1,
  count: 0,
  module: null,
  filterModule: null,
  filterLecturer: null,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
});

const topics = ref<TopicDetails[]>();

const manage = ref<ManageRegisterTime>();

const lecturers = ref<UserDetails[]>();

const modules = ref<ModuleDetails[]>();

const isOpenSuggestModal = ref(false);

const getTopicList = async () => {
  try {
    const { page, numberOfItemsPerPage, module } = model;
    const { data: response } = await API.get(`/topic/reported`, {
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
    getTopicList();
  },
  { immediate: true }
);

const lecturerOptions = computed(() => {
  return lecturers.value?.map(({ name, _id, email }) => ({
    subtitle: email,
    title: name,
    value: _id,
  }));
});

const moduleOptions = computed(() => {
  return modules.value?.map(({ moduleId, name, _id }) => ({
    title: moduleId + " | " + name,
    value: _id,
    subvalue: moduleId,
  }));
});
</script>

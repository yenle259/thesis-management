<template>
  <CustomCard
    :title="'Quản lý danh mục'"
    :subTitle="'Thông tin danh mục học phần và học kì - năm học'"
  >
    <template v-slot:content>
      <v-tabs v-model="model.tab" color="indigo">
        <v-tab
          :variant="model.tab === 'semester' ? 'tonal' : 'text'"
          value="semester"
          >HỌC KÌ - NĂM HỌC</v-tab
        >
        <v-tab
          :variant="model.tab === 'module' ? 'tonal' : 'text'"
          value="module"
          >HỌC PHẦN</v-tab
        >
      </v-tabs>
      <hr />
      <v-window v-model="model.tab" class="mb-4">
        <v-window-item key="semester" value="semester">
          <ManageSchoolYearSemester
            :semesters="semesters || []"
            @updated-semester="handleUpdateSemester()"
        /></v-window-item>
        <v-window-item key="module" value="module">
          <ManageModule
            :modules="modules || []"
            @updated-module="handleUpdateModule"
        /></v-window-item>
      </v-window>
      <v-card class="rounded-lg mx-auto"> </v-card>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";

useTitle("QLĐT - Quản lý danh mục");

const modules = ref<ModuleDetails[]>();

const semesters = ref<SchoolYearSemester[]>();

const route = useRoute();

const model = reactive({
  show: false,
  showRePw: false,
  tab: route.query.update ?? "info",
  password: "",
  rePassword: "",
});

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

const handleUpdateSemester = () => {
  getSemesters();
};
const handleUpdateModule = () => {
  getModules();
};
</script>

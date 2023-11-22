<template>
  <div>
    <ManageSchoolYearSemester />
  </div>
  <CustomCard :title="'Học phần'" :subTitle="'Danh sách phân loại học phần'">
    <template v-slot:action>
      <v-btn color="indigo">Thêm mới học phần</v-btn>
    </template>
    <template v-slot:content>
      <v-card class="rounded-lg">
        <ManageModule :modules="modules || []" />
      </v-card>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

useTitle("QLĐT - Quản lý Học kì - Niên khóa");

const modules = ref<ModuleDetails[]>();

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
</script>

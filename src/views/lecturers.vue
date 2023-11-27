<template>
  <div>
    <LecturerList :lecturers="lecturers ?? []" />
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { LecturerDetails } from "@/apis/models/LecturerDetails";

useTitle("QLĐT - Danh sách giảng viên");

const model = reactive({
  total: 0,
});

const lecturers = ref<LecturerDetails[]>();

const getLecturers = async () => {
  try {
    const { data: response } = await API.get("/user/lecturers");
    lecturers.value = response.lecturers;
    model.total = response.count;
  } catch (error) {
    console.log(error);
  }
};

getLecturers();
</script>

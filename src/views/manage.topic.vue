<template>
  <div>
    <CustomCard
      :title="'Danh sách đề tài'"
      :subTitle="'Danh sách đề tài đã được duyệt'"
    >
      <template v-slot:action>
        <v-btn class="me-2" variant="tonal" color="blue"
          >Nhập DS sinh viên</v-btn
        >
        <v-btn variant="tonal" color="blue">Xuất DS sinh viên</v-btn>
      </template>
      <template v-slot:content>
        <StudentManageTable :students="students ?? []" />
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { StudentDetails } from "@/apis/models/StudentDetails";

useTitle("QLĐT - Quản lý sinh viên");

const students = ref<StudentDetails[]>();

const useStudent = async () => {
  try {
    const { data: response } = await API.get(`/student`);
    students.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
  return students;
};

useStudent();
</script>

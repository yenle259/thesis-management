<template>
  <div>
    <CustomCard
      :title="'Danh sách đề tài'"
      :subTitle="'Danh sách đề tài đã được duyệt'"
    >
      <template v-slot:action>
        <v-btn variant="tonal" color="blue">Xuất DS đề tài</v-btn>
      </template>
      <template v-slot:content>
        <ManageReportTopic :reports="reports ?? []" />
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ReportTopic } from "@/apis/models/ReportTopic";

useTitle("QLĐT - Quản lý đề tài được duyệt");

const reports = ref<ReportTopic[]>();

const getReports = async () => {
  try {
    const { data: response } = await API.get(`/report`);
    reports.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getReports();

console.log(reports);
</script>

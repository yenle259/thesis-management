<template>
  <div>
    <CustomCard
      :title="'Danh sách đề tài'"
      :subTitle="'Danh sách đề tài đã được duyệt'"
    >
      <template v-slot:action>
        <v-btn
          v-if="reports"
          variant="tonal"
          color="blue"
          @click="handleExportReports(reports)"
          >Xuất DS đề tài</v-btn
        >
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
import { ReportTopicRow } from "@/apis/models/ReportTopicRow";
import { utils, writeFileXLSX } from "xlsx";

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

const createDataToExport = (reports: ReportTopic[]) => {
  return reports.map(({ pi, topic, student, isReport }) => ({
    "Mã số giảng viên": pi.userId,
    "Họ tên Giảng viên": pi.name,
    "Mã số sinh viên": student.userId,
    "Họ tên sinh viên": student.name,
    "Tên đề tài": topic.name,
    "Phân loại đề tài": getTopicTypeName(topic.type),
    "Xác nhận báo cáo": isReport ? "Có" : "Chưa",
  }));
};

const handleExportReports = (reports: ReportTopic[]) => {

  const data = createDataToExport(reports);
  
  const ws = utils.json_to_sheet(data);
  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFileXLSX(wb, "Danh sach huong dan de tai.xlsx");
};
</script>

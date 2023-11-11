<template>
  <div>
    <CustomCard
      :title="'Danh sách đề tài'"
      :subTitle="'Danh sách đề tài đã được duyệt'"
    >
      <template v-slot:action
        ><div>
          <ManagePublishTopicButton /></div
      ></template>
      <template v-slot:content>
        <div class="d-flex flex-row justify-between">
          <v-tabs v-model="model.tab" class="mt-2">
            <v-tab
              v-for="({ title, label, value }, index) in tabItem"
              :key="index"
              :value="value"
              :title="title"
              hide-slider
              density="compact"
              class="rounded-xl me-1"
              color="indigo"
              :variant="model.tab === value ? 'flat' : 'text'"
              >{{ label }}
            </v-tab>
          </v-tabs>
          <v-btn
            class="hover:shadow-sm"
            v-if="filterTopics"
            prepend-icon="mdi-export-variant"
            variant="tonal"
            color="blue"
            @click="handleExportReports(filterTopics)"
            >Xuất danh sách</v-btn
          >
        </div>
        <ManageReportTopic :reports="filterTopics || []" />
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ReportTopic } from "@/apis/models/ReportTopic";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";

import { utils, writeFileXLSX } from "xlsx";

useTitle("QLĐT - Quản lý đề tài được duyệt");

const tabItem = ref([
  {
    label: "Tất cả",
    title: "Tất cả đề tài đã được duyệt",
    value: "all",
  },
  {
    label: "Báo cáo",
    title: "Đề tài Luận văn và Tiểu luận",
    value: "report",
  },
]);

const model = reactive({
  tab: "all",
});

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

const filterTopics = computed(() => {
  if (model.tab === "report") {3
    return reports.value?.filter(({ topic }) =>
      [TopicTypeEnum.LV, TopicTypeEnum.TL].includes(topic.type)
    );
  }
  return reports.value;
});

const createDataToExport = (reports: ReportTopic[]) => {
  return reports.map(({ pi, topic, student }) => ({
    lecturerId: pi.userId,
    lecturerName: pi.name,
    studentId: student.userId,
    studentName: student.name,
    topicName: topic.name,
    topicType: getTopicTypeName(topic.type),
    // "Xác nhận báo cáo": isReport ? "Có" : "Chưa",
  }));
};

const handleExportReports = (reports: ReportTopic[]) => {
  const data = createDataToExport(reports);
  data.unshift({
    lecturerId: "MSCB",
    lecturerName: "Tên giảng viên",
    studentId: "MSSV",
    studentName: "Tên sinh viên",
    topicName: "Tên đề tài",
    topicType: "Phân loại đề tài",
  });

  const ws = utils.json_to_sheet(data, {
    skipHeader: true,
  });

  const wscols = [
    { wch: 10 },
    { wch: 20 },
    { wch: 10 },
    { wch: 20 },
    { wch: 70 },
    { wch: 20 },
  ];

  ws["!cols"] = wscols;

  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFileXLSX(wb, "Danh sach huong dan de tai.xlsx", { cellStyles: true });
};
</script>

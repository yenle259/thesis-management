<template>
  <div>
    <CustomCard
      :title="'Danh sách đề tài'"
      :subTitle="'Danh sách đề tài đã được duyệt'"
    >
      <template v-slot:action> </template>
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
              class="rounded-lg me-1"
              color="indigo"
              :variant="model.tab === value ? 'flat' : 'text'"
              >{{ label }}
            </v-tab>
          </v-tabs>
          <v-btn
            v-if="filterTopics"
            variant="tonal"
            color="blue"
            @click="handleExportReports(filterTopics)"
            >Xuất DS đề tài</v-btn
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
    title: "Tất cả đề tài",
    value: "all",
  },
  {
    label: "Báo cáo",
    title: "Đề tài báo cáo",
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
  if (model.tab === "report") {
    return reports.value?.filter(({ topic }) =>
      [TopicTypeEnum.LV, TopicTypeEnum.TL].includes(topic.type)
    );
  }
  return reports.value;
});

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

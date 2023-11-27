<template>
  <div>
    <CustomCard
      :title="'Danh sách đề tài'"
      :subTitle="'Danh sách đề tài đã được duyệt'"
    >
      <template v-slot:action
        ><div>
          <ManagePublishTopicButton
            :manage="manageRegisterTime || {}"
            @updated="handleUpdated()"
          /></div
      ></template>
      <template v-slot:content>
        <div class="d-flex flex-row justify-between">
          <v-tabs v-model="model.tab" class="mt-2">
            <v-tab
              v-for="({ title, label, value }, index) in REPORT_TOPIC"
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
            v-if="reports"
            prepend-icon="mdi-export-variant"
            variant="tonal"
            color="blue"
            @click="handleExportReports(reports)"
            >Xuất danh sách</v-btn
          >
        </div>
        <ManageReportTopic :reports="reports || []">
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
        </ManageReportTopic>
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { ReportTopic } from "@/apis/models/ReportTopic";
import { PAGINATION_OPTIONS } from "@/constant";
import { REPORT_TOPIC } from "@/constants/tab";
import { utils, writeFileXLSX } from "xlsx";

useTitle("QLĐT - Quản lý đề tài được duyệt");

const model = reactive({
  tab: REPORT_TOPIC[0].value,
  isReport: false,
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
});

const reports = ref<ReportTopic[]>();

const manageRegisterTime = ref<ManageRegisterTime>();

const getReports = async () => {
  try {
    const { page, numberOfItemsPerPage, isReport } = model;
    const { data: response } = await API.get(`/report`, {
      params: {
        page: page,
        limit: numberOfItemsPerPage,
        isReport: !isReport ? null : isReport,
      },
    });
    reports.value = response.topics;
    model.page = response.currentPage;
    model.totalsPage = response.totalPages;
    model.count = response.count;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getReports();

const getRegisterTopicTime = async () => {
  try {
    const { data: response } = await API.get(`/register-time`);

    manageRegisterTime.value = response;

    return response;
  } catch (error) {
    console.log(error);
  }
};

getRegisterTopicTime();

watch(
  () => model.tab,
  () => {
    if (model.tab !== "all") {
      model.isReport = true;
      getReports();
    } else {
      model.isReport = false;
      getReports();
    }
  }
);

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

//refetch after change register time
const handleUpdated = () => {
  getRegisterTopicTime();
};
</script>

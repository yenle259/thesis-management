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
          <div class="flex flex-row">
            <!-- <div class="w-60 me-2">
              <v-autocomplete
                v-model="model.filterLecturer"
                :items="lecturerOptions"
                variant="underlined"
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
            </div> -->
            <v-btn
              class="hover:shadow-sm"
              v-if="reports"
              prepend-icon="mdi-export-variant"
              variant="tonal"
              color="blue"
              :disabled="reports.length === 0"
              @click="handleGetReportsExport"
              >Xuất danh sách</v-btn
            >
          </div>
        </div>
        <ManageReportTopicList :reports="reports || []">
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
        </ManageReportTopicList>
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ManageRegisterTime } from "@/apis/models/ManageRegisterTime";
import { ReportTopic } from "@/apis/models/ReportTopic";
import { UserDetails } from "@/apis/models/UserDetails";

import { PAGINATION_OPTIONS } from "@/constant";
import { REPORT_TOPIC } from "@/constants/tab";
import { utils, writeFileXLSX } from "xlsx";

useTitle("QLĐT - Quản lý đề tài được duyệt");

const route = useRouter();

watch(
  () => route,
  () => {
    console.log(route);
  }
);

const model = reactive({
  tab: REPORT_TOPIC[0].value,
  isReport: false,
  reportStatus: "",
  filterLecturer: null,
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
  isLoading: false,
});

const reports = ref<ReportTopic[]>();

const exports = ref<ReportTopic[]>();

const lecturers = ref<UserDetails[]>();

const manageRegisterTime = ref<ManageRegisterTime>();

const getReports = async () => {
  try {
    const { page, numberOfItemsPerPage, isReport, reportStatus } = model;
    const { data: response } = await API.get(`/report`, {
      params: {
        page: page,
        limit: numberOfItemsPerPage,
        isReport: !isReport ? null : isReport,
        reportStatus: reportStatus !== "" ? reportStatus : null,
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

const handleGetReportsExport = async () => {
  model.isLoading = true;
  try {
    const { isReport, reportStatus } = model;
    const { data: response } = await API.get(`/report`, {
      params: {
        isReport: !isReport ? null : isReport,
        reportStatus: reportStatus !== "" ? reportStatus : null,
      },
    });
    exports.value = response.topics;
    exports.value ? handleExportReports(exports.value) : null;
    return response;
  } catch (error) {
    console.log(error);
  }
};

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

const getLecturers = async () => {
  try {
    const { data: response } = await API.get("/user/lecturers");
    lecturers.value = response.lecturers;
  } catch (error) {
    console.log(error);
  }
};

getLecturers();

const lecturerOptions = computed(() => {
  return lecturers.value?.map(({ name, _id, email }) => ({
    subtitle: email,
    title: name,
    value: _id,
  }));
});

watch(
  () => model.tab,
  () => {
    model.isReport = model.tab === "report" ?? false;
    model.reportStatus = ["REPORT", "POSTPONE"].includes(model.tab)
      ? model.tab
      : "";
    getReports();
  }
);

const createDataToExport = (reports: ReportTopic[]) => {
  return reports.map(({ pi, topic, student, reportStatus }) => ({
    lecturerId: pi.userId,
    lecturerName: pi.name,
    studentId: student.userId,
    studentName: student.name,
    topicName: topic.name,
    moduleId: topic.module.moduleId,
    moduleName: topic.module.name,
    reportStatus: reportStatus
      ? reportStatusLabel(reportStatus)
      : "Chưa đăng ký",
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
    moduleId: "Mã học phần",
    moduleName: "Học phần",
    reportStatus: "Trạng thái báo cáo",
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
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
  ];

  ws["!cols"] = wscols;

  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFileXLSX(wb, "Danh sach huong dan de tai.xlsx", { cellStyles: true });

  //done
  model.isLoading = false;
};

//refetch after change register time
const handleUpdated = () => {
  getRegisterTopicTime();
};
</script>

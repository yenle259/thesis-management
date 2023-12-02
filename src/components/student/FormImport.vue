<template>
  <div>
    <div class="d-flex flex-row justify-end gap-x-2 mb-4 my-2">
      <v-btn
        color="blue"
        append-icon="mdi-download"
        class="me-2"
        title="Tải xuống file dữ liệu mẫu để import"
        variant="tonal"
        @click="handleDownloadSample"
        >Mẫu file import</v-btn
      >
      <div v-if="model.fileImport">
        <v-btn
          icon="mdi-restore"
          class="me-2"
          title="Reset data"
          variant="plain"
          @click="model.fileImport = undefined"
        ></v-btn>
      </div>
    </div>
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white-700 hover:bg-grey-100"
      >
        <div class="flex flex-col items-center justify-center pt-5">
          <svg
            class="w-8 h-8 mb-2 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Nhấn vào để upload</span>
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Tải lên file dữ liệu để thực hiện import (.xlsx)
          </p>
          <p
            v-if="!model.fileImport"
            class="text-xs text-caption font-italic text-gray-500 dark:text-gray-400"
          >
            Chưa có file được chọn
          </p>
        </div>
        <div>
          <v-file-input
            v-model="model.fileImport"
            id="dropzone-file"
            accept=".xlsx"
            show-size
            closable="false"
            density="compact"
            variant="underlined"
            prepend-icon="undefined"
          >
          </v-file-input>
        </div>
      </label>
    </div>

    <div v-if="students" class="mt-8">
      <hr />
      <v-card-title class="d-flex flex-row text-indigo justify-between mt-4">
        <div>
          <span class="text-h6"> Xem trước dữ liệu </span>
          <p class="font-light text-caption text-black">
            Xem thông tin sinh viên trong file dữ liệu vừa nhập vào
          </p>
        </div>
        <div>
          <v-btn variant="tonal" color="blue" @click="handleSubmit"
            >Nhập dữ liệu</v-btn
          >
        </div>
      </v-card-title>
      <v-table density="comfortable">
        <thead>
          <tr class="text-overline">
            <th v-for="(item, index) in STUDENT_IMPORT" :key="index">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="({ ...STUDENT_IMPORT }, index) in students" :key="index">
            <td
              :class="{
                'text-caption text-red': !STUDENT_IMPORT.userId,
              }"
            >
              {{ STUDENT_IMPORT.userId ?? "null" }}
            </td>
            <td
              :class="{
                'text-caption text-red': !STUDENT_IMPORT.name,
              }"
            >
              {{ STUDENT_IMPORT.name ?? "null" }}
            </td>
            <td
              :class="{
                'text-caption text-red': !STUDENT_IMPORT.password,
              }"
            >
              <span v-if="STUDENT_IMPORT.password">
                <v-text-field
                  disabled
                  class="w-14"
                  variant="plain"
                  density="compact"
                  :value="STUDENT_IMPORT.password"
                  type="password"
                >
                </v-text-field>
              </span>
              <span v-else>{{ null }}</span>
            </td>
            <td
              :class="{
                'text-caption text-red': !STUDENT_IMPORT.email,
              }"
            >
              {{ STUDENT_IMPORT.email ?? "null" }}
            </td>
            <td
              :class="{
                'font-italic text-caption text-grey':
                  !STUDENT_IMPORT.moduleType,
              }"
            >
              {{ STUDENT_IMPORT.moduleType ?? `Không có` }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { read, utils, writeFileXLSX } from "xlsx";
import { STUDENT_IMPORT } from "@/constants/header";

import "vue3-toastify/dist/index.css";
import API from "@/apis/helpers/axiosBaseConfig";

const emit = defineEmits(["created"]);

const students = ref();

const model = reactive({
  fileImport: undefined,
});

watch(
  () => model.fileImport,
  () => {
    if (model.fileImport) {
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = read(fileData, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, {
          defval: null,
          // header: STUDENT_IMPORT,
        });
        students.value = data;
        console.log(students.value);
      };
      reader.readAsBinaryString(model.fileImport[0]);
    } else {
      students.value = null;
    }
  }
);

const handleSubmit = async () => {
  console.log(students.value);
  try {
    const { data: response } = await API.post(
      `/student/account/import`,
      students.value
    );
    emit("created");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleDownloadSample = () => {
  const data: any[] = [];
  const headers = ["userId", "name", "password", "email", "moduleType"];

  const ws = utils.json_to_sheet(data, { header: headers });

  const wscols = [{ wch: 10 }, { wch: 20 }, { wch: 10 }, { wch: 40 }];

  ws["!cols"] = wscols;

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, "Mau file import nguoi dung.xlsx", { cellStyles: true });
};
</script>

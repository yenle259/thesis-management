<template>
  <div>
    <div class="d-flex flex-row justify-between gap-x-2">
      <v-card-title class="d-flex flex-row text-indigo justify-between">
        <div>
          <span class="text-h6"> Nhập file </span>
          <p class="font-light text-caption text-black">
            Thêm tài khoản sinh viên bằng file
          </p>
        </div>
      </v-card-title>
      <v-btn
        variant="tonal"
        color="info"
        @click="handleImportFile"
        :disabled="!model.fileImport"
        >Xem trước dữ liệu</v-btn
      >
    </div>
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white-700 hover:bg-grey-100"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-2">
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
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Nhấn vào để upload</span> hoặc kéo
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            .xlsx file or spreadsheet
          </p>
        </div>
        <div>
          <v-file-input
            v-model="model.fileImport"
            id="dropzone-file"
            accept=".xlsx"
            show-size
            clearable
            density="compact"
            variant="underlined"
            prepend-icon="undefined"
          ></v-file-input>
        </div>
      </label>
    </div>

    <div v-if="students" class="mt-8">
      <hr />
      <v-card-title class="d-flex flex-row text-indigo justify-between mt-4">
        <div>
          <span class="text-h6"> Xem trước dữ liệu </span>
          <p class="font-light text-caption text-black">
            Xem trước thông tin sinh viên trong file dữ liệu nhập vào
          </p>
        </div>
      </v-card-title>
      <v-table density="comfortable">
        <thead>
          <tr>
            <th
              v-for="(item, index) in students[0]"
              :key="index"
              class="text-overline"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rowData, indexRow, index) in students" :key="index">
            <td v-for="(item, index) in students[indexRow + 1]" :key="index">
              {{ item ?? "null" }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { read, utils } from "xlsx";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
        const data = utils.sheet_to_json(ws, { header: 1 });
        students.value = data;
      };
      reader.readAsBinaryString(model.fileImport[0]);
    }
  }
);

const handleImportFile = async () => {
  if (model.fileImport) {
    var reader = new FileReader();
    reader.onload = () => {
      var fileData = reader.result;
      var wb = read(fileData, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, { header: 1 });
      students.value = data;
    };
    reader.readAsBinaryString(model.fileImport[0]);
  }
};

console.log(students);
</script>

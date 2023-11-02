<template>
  <div>
    <CustomCard
      :title="'Danh sách sinh viên'"
      :subTitle="'Danh sách sinh viên đăng ký đề tài'"
    >
      <template v-slot:action> </template>
      <template v-slot:content>
        <div class="d-flex flex-row justify-between">
          <div></div>
          <div class="mb-4">
          </div>
        </div>
        <div class="gap-x-2">
          <div class="d-flex flex-row justify-end mb-2">
            <v-tabs v-model="model.accountTab" class="mt-2">
              <v-tab
                v-for="({ title, label, value, icon }, index) in ACCOUNT_TAB"
                :key="index"
                :value="value"
                :title="title"
                :append-icon="icon"
                hide-slider
                density="compact"
                class="rounded-lg me-1"
                color="indigo"
                :variant="model.accountTab === value ? 'elevated' : 'text'"
                >{{ label }}
              </v-tab>
            </v-tabs>
          </div>
          <v-window v-model="model.accountTab">
            <div class="p-1">
              <v-card class="rounded-lg"
                ><v-window-item key="list" value="list">
                  <StudentManageTable :students="students ?? []" />
                </v-window-item>
                <v-window-item key="file" value="file"
                  ><div class="p-4">
                    <StudentFormImport />
                  </div>
                </v-window-item>
                <v-window-item key="account" value="account">
                  <div class="p-4">
                    <SignupForm />
                  </div>
                </v-window-item>
              </v-card>
            </div>
          </v-window>
        </div>
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { StudentDetails } from "@/apis/models/StudentDetails";
import SignupForm from "@/components/core/SignupForm.vue";
import { ACCOUNT_TAB } from "@/constants/tab";

import { File } from "buffer";
import { readFile, set_fs, read, utils } from "xlsx";

useTitle("QLĐT - Quản lý sinh viên");

const model = reactive({
  tab: "",
  accountTab: "list",
  file: undefined,
});

const students = ref<StudentDetails[]>();

const dataImport = ref();

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

interface UserRow {
  userId: string;
  name: string;
}

watch(
  () => model.file,
  (file) => {
    if (file) {
      dataImport.value = readFile(file[0]);

      const wb = read(file);

      /* generate array of presidents from the first worksheet */
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet

      const data: UserRow[] = utils.sheet_to_json<UserRow>(ws);

      console.log("đ");
      console.log(data);
      console.log(dataImport);
    }
  }
);
</script>

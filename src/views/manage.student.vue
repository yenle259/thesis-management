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
          <v-tabs v-model="model.accountTab" class="mt-2">
            <div class="d-flex flex-row justify-end">
              <v-tab
                key="list"
                value="list"
                prepend-icon="mdi-format-list-bulleted"
                hide-slider
                density="compact"
                class="rounded-lg me-1"
                color="indigo"
                :variant="model.accountTab === 'list' ? 'elevated' : 'text'"
                >Danh sách chung
              </v-tab>
              <div>
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
              </div>
            </div>
          </v-tabs>
        </div>
        <div class="gap-x-2">
          <v-window v-model="model.accountTab">
            <div class="p-1">
              <v-window-item key="list" value="list">
                <StudentManageTable
                  :students="students ?? []"
                  @edit="handleEditStudent"
                  @deleted="handleDeleted"
                  @refetch="useStudent"
                />
                <StudentEditInfoModal
                  :isShow="isOpenEditModal"
                  :student="selectedStudent || {}"
                  @cancel="isOpenEditModal = false"
                  @edited="handleUpdated"
                />
              </v-window-item>
              <v-card class="rounded-lg">
                <v-window-item key="account" value="account">
                  <div class="p-6">
                    <div>
                      <span class="text-h6 text-indigo"> Nhập File </span>
                      <p class="font-light text-caption text-black">
                        Thêm danh sách học phần đăng kí của sinh viên ở học kì
                        hiện tại
                      </p>
                    </div>
                    <StudentFormImport />
                  </div>
                </v-window-item>
              </v-card>
              <v-window-item key="file" value="file"
                ><div class="p-2 min-h-screen">
                  <v-expansion-panels v-model="model.panel" multiple>
                    <v-expansion-panel
                      key="account-form"
                      class="rounded-lg"
                      value="1"
                    >
                      <v-expansion-panel-title>
                        <div>
                          <span class="text-h6 text-indigo">
                            Thêm tài khoản
                          </span>
                          <p class="font-light text-caption text-black">
                            Thêm mới một tài khoản sinh viên
                          </p>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <SignupForm @created="handleCreated" />
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel
                      key="account-file"
                      class="rounded-lg"
                      value="2"
                    >
                      <v-expansion-panel-title>
                        <div>
                          <span class="text-h6 text-indigo"> Nhập file </span>
                          <p class="font-light text-caption text-black">
                            Thêm một danh sách tài khoản sinh viên bằng file
                          </p>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="pb-2">
                        <StudentFormImport />
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-window-item>
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

import { ACCOUNT_TAB } from "@/constants/tab";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Quản lý sinh viên");

const model = reactive({
  tab: "",
  accountTab: "file",
  panel: [1],
  file: undefined,
  search: "",
});

const students = ref<StudentDetails[]>();

const isOpenEditModal = ref(false);

const selectedStudent = ref<StudentDetails>();

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

const handleEditStudent = (student: StudentDetails) => {
  isOpenEditModal.value = true;
  selectedStudent.value = student;
};

const handleUpdated = () => {
  isOpenEditModal.value = false;
  useStudent();
  toast.success("Cập nhật thông tin sinh viên thành công");
};

const handleCreated = () => {
  useStudent();
  toast.success("Thêm mới sinh viên thành công");
  model.accountTab = "list";
};

const handleDeleted = () => {
  useStudent();
  toast.success("Xóa tài khoản sinh viên thành công");
};
</script>

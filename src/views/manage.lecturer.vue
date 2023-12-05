<template>
  <div>
    <CustomCard
      :title="'Danh sách cán bộ'"
      :subTitle="'Danh sách tài khoản cán bộ'"
    >
      <template v-slot:action> </template>
      <template v-slot:content>
        <div class="d-flex flex-row justify-between">
          <div></div>
          <v-tabs v-model="model.accountTab" class="mt-2">
            <div class="d-flex flex-row">
              <div>
                <v-tab
                  v-for="({ title, label, value, icon }, index) in LECTURER_TAB"
                  :key="index"
                  :value="value"
                  :title="title"
                  :append-icon="icon"
                  color="indigo"
                  :variant="model.accountTab === value ? 'tonal' : 'text'"
                  >{{ label }}
                </v-tab>
              </div>
            </div>
          </v-tabs>
        </div>
        <hr />
        <div class="gap-x-2">
          <v-window v-model="model.accountTab">
            <div class="p-1">
              <v-window-item key="list" value="list">
                <LecturerManageTable
                  :lecturers="lecturers ?? []"
                  :search="model.search || ''"
                  :role="model.role || ''"
                  @edit="handleEditStudent"
                  @deleted="handleDeleted"
                >
                  <template v-slot:action>
                    <v-text-field
                      v-model="model.search"
                      clearable
                      clear-icon="mdi-close-circle"
                      @click:clear="model.search = ''"
                      label="Tìm kiếm cán bộ"
                      placeholder="Mã số cán bộ, Họ tên"
                      prepend-inner-icon="mdi-magnify"
                      density="comfortable"
                      class="w-96"
                      max-width="400px"
                      variant="filled"
                    ></v-text-field>
                    <v-btn
                      class="ml-2"
                      selected-class="text-blue"
                      icon="mdi-restore"
                      title="Restore"
                      variant="plain"
                      @click="handleReset"
                    ></v-btn>
                  </template>
                  <template v-slot:action-end>
                    <div class="d-flex gap-x-2">
                      <div class="flex flex-row content-center p-2">
                        <p>
                          <v-icon>mdi-filter-variant</v-icon>
                        </p>
                      </div>
                      <div class="w-48">
                        <v-select
                          v-model="model.role"
                          :items="userRoleOptions"
                          clearable
                          chips
                          label="Vai trò"
                          variant="filled"
                          density="compact"
                          class="rounded-lg"
                        ></v-select>
                      </div>
                    </div>
                  </template>
                  <template
                    v-slot:pagination
                    v-if="filterStudents?.length !== 0"
                  >
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
                </LecturerManageTable>

                <LecturerEditInfoModal
                  :isShow="isOpenEditModal"
                  :user="selectedUser || {}"
                  @cancel="isOpenEditModal = false"
                  @edited="handleUpdated"
                />
              </v-window-item>

              <v-window-item key="file" value="file"
                ><div class="pt-4 min-h-screen">
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
                            Thêm mới một tài khoản giảng viên
                          </p>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <LecturerFormCreate @created="handleCreated" />
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
                            Thêm một danh sách tài khoản giảng viên bằng file
                          </p>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="pb-2">
                        <LecturerFormImport @created="handleCreated" />
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
import { LecturerDetails } from "@/apis/models/LecturerDetails";

import { LECTURER_TAB } from "@/constants/tab";

import { PAGINATION_OPTIONS } from "@/constant";

import { userRoleOptions } from "@/components/form/data/userRoleOptions";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Quản lý cán bộ");

const model = reactive({
  accountTab: "",
  panel: [1],
  search: "",
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
  file: undefined,
  role: null,
});

const students = ref<StudentDetails[]>();

const lecturers = ref<LecturerDetails[]>();

const isOpenEditModal = ref(false);

const selectedUser = ref<StudentDetails>();

const getLecturers = async () => {
  try {
    const { data: response } = await API.get(`/user/lecturers`, {
      params: {
        page: model.page,
        limit: model.numberOfItemsPerPage,
        search: model.search,
        role: model.role,
      },
    });
    lecturers.value = response.lecturers;
    model.count = response.count;
    model.page = response.currentPage;
    model.totalsPage = response.totalPages;
  } catch (error) {
    console.log(error);
  }
};

getLecturers();

watch(
  () => [model.numberOfItemsPerPage, model.page, model.search, model.role],
  () => {
    if (pagesCount(model.count, model.numberOfItemsPerPage) < model.page) {
      model.page = 1;
    }
    getLecturers();
  },
  { immediate: true }
);

const filterStudents = computed(() => {
  return students.value?.filter(
    (student) =>
      student.userId
        .toLocaleLowerCase()
        .includes(model.search.toLocaleLowerCase()) ||
      student.name
        .toLocaleLowerCase()
        .includes(model.search.toLocaleLowerCase())
  );
});

const handleReset = () => {
  model.search = "";
  model.role = null;
  model.numberOfItemsPerPage = PAGINATION_OPTIONS[0];
  model.page = 1;
};

const handleEditStudent = (student: StudentDetails) => {
  isOpenEditModal.value = true;
  selectedUser.value = student;
};

const handleUpdated = () => {
  isOpenEditModal.value = false;
  getLecturers();
  toast.success("Cập nhật thông tin cán bộ thành công");
};

const handleCreated = () => {
  toast.success("Thêm mới cán bộ thành công");
  getLecturers();
  model.accountTab = "list";
};

const handleDeleted = () => {
  getLecturers();
  toast.success("Xóa tài khoản cán bộ thành công");
};

</script>

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
                  :students="filterStudents ?? []"
                  @edit="handleEditStudent"
                  @deleted="handleDeleted"
                  @refetch="useStudent"
                >
                  <template v-slot:action>
                    <div class="px-4 mt-4 d-flex justify-between">
                      <div class="d-flex flex-row">
                        <v-text-field
                          v-model="model.search"
                          clearable
                          clear-icon="mdi-close-circle"
                          @click:clear="model.search = ''"
                          label="Tìm kiếm sinh viên"
                          placeholder="Mã số sinh viên, Họ tên"
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
                      </div>
                      <div class="d-flex gap-x-2">
                        <div class="flex flex-row content-center p-2">
                          <p>
                            <v-icon>mdi-filter-variant</v-icon>
                          </p>
                        </div>
                        <div class="w-52">
                          <v-select
                            v-model="model.filterModule"
                            :items="
                              moduleOptions?.concat([
                                {
                                  title: 'Chưa đăng ký',
                                  value: 'none',
                                },
                              ])
                            "
                            clearable
                            chips
                            label="Học phần đăng ký"
                            variant="filled"
                            density="compact"
                            class="rounded-lg"
                          ></v-select>
                        </div>
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
                </StudentManageTable>

                <StudentEditInfoModal
                  :isShow="isOpenEditModal"
                  :student="selectedStudent || {}"
                  :moduleOptions="moduleOptions || []"
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
                        <SignupForm
                          :modules="modules ?? []"
                          :module-options="
                            modules ? useModuleOptions(modules) : []
                          "
                          @created="handleCreated"
                        />
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
import { ModuleDetails } from "@/apis/models/ModuleDetails";

import { ACCOUNT_TAB } from "@/constants/tab";
import { PAGINATION_OPTIONS } from "@/constant";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Quản lý sinh viên");

const model = reactive({
  accountTab: "list",
  panel: [1],
  search: "",
  page: 1,
  count: 0,
  totalsPage: 1,
  numberOfItemsPerPage: PAGINATION_OPTIONS[0],
  file: undefined,
  registerModuleType: null,
  filterModule: null,
});

const students = ref<StudentDetails[]>();

const modules = ref<ModuleDetails[]>();

const isOpenEditModal = ref(false);

const selectedStudent = ref<StudentDetails>();

const useStudent = async () => {
  try {
    const { page, numberOfItemsPerPage, search, filterModule } = model;

    const { data: response } = await API.get(`/student`, {
      params: {
        page,
        limit: numberOfItemsPerPage,
        search: search !== "" ? search : null,
        module: filterModule !== null ? filterModule : null,
      },
    });

    students.value = response.students;
    model.page = response.currentPage;
    model.count = response.count;
    model.totalsPage = response.totalPages;

    return response;
  } catch (error) {
    console.log(error);
  }
  return students;
};

useStudent();

const getModules = async () => {
  try {
    const { data: response } = await API.get(`/module`);
    modules.value = response;

    return response;
  } catch (error) {
    console.log(error);
  }
};

getModules();

const moduleOptions = computed(() => {
  return modules.value?.map((module) => ({
    title: module.moduleId + " | " + module.name,
    // value: module._id,
    value: module.moduleId,
  }));
});

watch(
  () => [
    model.numberOfItemsPerPage,
    model.page,
    model.search,
    model.filterModule,
  ],
  () => {
    if (pagesCount(model.count, model.numberOfItemsPerPage) < model.page) {
      model.page = 1;
    }
    useStudent();
  },
  { immediate: true }
);

watch(
  () => model.registerModuleType,
  (value) => {
    console.log(value);
  }
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
  model.numberOfItemsPerPage = PAGINATION_OPTIONS[0];
  model.page = 1;
  model.filterModule = null;
};

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

<template>
  <hr />
  <div class="d-flex flex-row justify-end my-4">
    <v-btn
      v-if="props.students"
      class="hover:shadow-sm"
      prepend-icon="mdi-export-variant"
      variant="tonal"
      color="blue"
      @click="handleExport(props.students)"
      >Xuất danh sách</v-btn
    >
  </div>
  <v-card v-if="props.students" class="rounded-lg">
    <slot name="action"></slot>
    <v-divider inset />
    <v-table>
      <thead>
        <tr class="text-overline">
          <th class="text-left">MSSV</th>
          <th class="text-left">Sinh viên</th>
          <th class="text-left">Học phần đăng ký</th>
          <th>Thực hiện</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-sm"
          v-for="student in props.students"
          :key="student._id"
        >
          <td class="uppercase">
            {{ student.userId }}
          </td>
          <td>
            <v-list-item class="rounded-lg w-38">
              <p
                class="text-grey-800 text-xs"
                :class="{
                  'text-caption font-italic text-grey': !student.name,
                }"
              >
                {{ student.name ?? "Chưa có tên" }}
              </p>
              <p class="text-caption text-xs text-grey">
                {{ student.email }}
              </p>
            </v-list-item>
          </td>
          <td v-if="student.registerModule[0].moduleType">
            <span
              v-for="(
                item, index
              ) in student.registerModule[0].moduleType.split('-')"
              :key="index"
            >
              <v-chip
                class="me-1"
                v-if="item"
                size="small"
                :color="getTopicModuleColor(item)"
              >
                {{ item }}
              </v-chip>
            </span>
          </td>
          <td v-else>
            <span class="font-italic text-caption">Chưa đăng ký</span>
          </td>

          <td class="text-center">
            <v-row>
              <div>
                <v-tooltip text="Chỉnh sửa thông tin" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      variant="plain"
                      icon="mdi-pencil"
                      color="indigo"
                      @click="handleEdit(student)"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
              <div>
                <v-tooltip text="Khóa tài khoản" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      variant="plain"
                      icon="mdi-account-lock"
                      color="grey"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
              <div>
                <v-tooltip text="Xóa tài khoản" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      variant="plain"
                      icon="mdi-delete-outline"
                      color="red-accent-1"
                      @click="handleDeleteStudent(student)"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>
    <hr />
    <div v-if="props.students">
      <slot name="pagination"></slot>
    </div>
    <div
      v-if="props.students.length === 0"
      class="text-body-2 text-center my-4 font-italic"
    >
      Không có sinh viên
    </div>
  </v-card>

  <StudentDeleteModal
    :is-show="isShowDeleteModal"
    :student="selectedStudent || {}"
    @cancel="isShowDeleteModal = false"
    @deleted="handleDeleted"
  />
</template>

<script setup lang="ts">
import { StudentDetails } from "@/apis/models/StudentDetails";

import { RECENT_SEMESTER_ID } from "@/constant";

import { utils, writeFileXLSX } from "xlsx";

const emit = defineEmits(["edit", "deactive", "deleted", "refetch"]);

const props = defineProps<{ students: StudentDetails[] }>();

const isShowDeleteModal = ref(false);

const selectedStudent = ref<StudentDetails>();

const handleEdit = (student: StudentDetails) => {
  emit("edit", student);
};

const handleDeleteStudent = (student: StudentDetails) => {
  isShowDeleteModal.value = true;
  selectedStudent.value = student;
};

const handleDeleted = () => {
  isShowDeleteModal.value = false;
  emit("deleted");
};

const createDataToExport = (students: StudentDetails[]) => {
  const data = students.map(({ userId, name, email, registerModule }) => {
    const recentModule = getRecentRegisterModule(
      registerModule,
      RECENT_SEMESTER_ID
    )?.moduleType;
    return {
      userId,
      name,
      email,
      module: recentModule !== "" ? recentModule : "Chưa có",
    };
  });
  return data;
};

const handleExport = (students: StudentDetails[]) => {
  const data = createDataToExport(students);
  data.unshift({
    userId: "MSSV",
    name: "Họ tên sinh viên",
    email: "Email",
    module: "Học phần đăng ký",
  });

  const ws = utils.json_to_sheet(data, {
    skipHeader: true,
  });

  const wscols = [{ wch: 10 }, { wch: 20 }, { wch: 40 }, { wch: 20 }];

  ws["!cols"] = wscols;

  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFileXLSX(wb, "Danh sach hoc phan dang ky cua sinh vien.xlsx", {
    cellStyles: true,
  });
};
</script>

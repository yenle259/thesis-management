<template>
  <v-card v-if="lecturers" class="rounded-lg mt-4">
    <div class="px-4 mt-4 d-flex justify-between">
      <div class="d-flex flex-row">
        <slot name="action"></slot>
      </div>
      <div class="d-flex flex-row">
        <slot name="action-end"></slot>
        <v-btn
          v-if="props.lecturers"
          height="47"
          class="ml-3"
          prepend-icon="mdi-export-variant"
          variant="tonal"
          color="blue"
          @click="handleExport(props.lecturers)"
          >Xuất danh sách</v-btn
        >
      </div>
    </div>

    <v-divider inset />
    <v-table>
      <thead>
        <tr class="text-overline">
          <th class="text-left">MSCB</th>
          <th class="text-left">Giảng viên</th>
          <th class="text-left">Vai trò</th>
          <th>Thực hiện</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-sm" v-for="lecturer in lecturers" :key="lecturer._id">
          <td class="uppercase">
            {{ lecturer.userId }}
          </td>
          <td>
            <v-list-item class="rounded-lg w-38">
              <p
                class="text-grey-800 text-xs"
                :class="{
                  'text-caption font-italic text-grey': !lecturer.name,
                }"
              >
                {{ lecturer.name ?? "Chưa có tên" }}
              </p>
              <p class="text-caption text-xs text-grey">
                {{ lecturer.email }}
              </p>
            </v-list-item>
          </td>
          <td>
            <v-chip
              v-if="lecturer.role"
              class="me-1"
              size="small"
              :variant="
                lecturer.role === UserRoleEnum.Admin ? 'outlined' : 'tonal'
              "
            >
              {{ getUserRoleName(lecturer.role) }}
            </v-chip>
            <div v-else class="text-caption font-italic">Chưa có</div>
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
                      @click="handleEdit(lecturer)"
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

    <div
      v-if="lecturers.length === 0"
      class="text-body-2 text-center my-4 font-italic"
    >
      Không có sinh viên
    </div>
    <div v-if="lecturers.length !== 0">
      <slot name="pagination"></slot>
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
import { LecturerDetails } from "@/apis/models/LecturerDetails";
import { UserRoleEnum } from "@/apis/models/UserRoleEnum";
import { utils, writeFileXLSX } from "xlsx";

const emit = defineEmits(["edit", "deactive", "deleted", "refetch"]);

const props = defineProps<{ lecturers: LecturerDetails[] }>();

const isShowDeleteModal = ref(false);

const selectedStudent = ref<LecturerDetails>();

const handleEdit = (student: LecturerDetails) => {
  emit("edit", student);
};

const handleDeleted = () => {
  isShowDeleteModal.value = false;
  emit("deleted");
};

const createDataToExport = (lecturers: LecturerDetails[]) => {
  const data = lecturers.map(({ userId, name, email, role }) => {
    return {
      userId,
      name,
      email,
      role: role ? getUserRoleName(role) : "Chưa có",
    };
  });
  return data;
};

const handleExport = (lecturers: LecturerDetails[]) => {
  const data = createDataToExport(lecturers);
  data.unshift({
    userId: "MSSV",
    name: "Họ tên cán bộ",
    email: "Email",
    role: "Vai trò",
  });

  const ws = utils.json_to_sheet(data, {
    skipHeader: true,
  });

  const wscols = [{ wch: 10 }, { wch: 30 }, { wch: 20 }, { wch: 20 }];

  ws["!cols"] = wscols;

  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFileXLSX(wb, "Danh sach can bo.xlsx", {
    cellStyles: true,
  });
};
</script>

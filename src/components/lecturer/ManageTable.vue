<template>
  <hr />
  <div class="d-flex flex-row justify-end my-4">
    <v-btn
      v-if="lecturers"
      class="hover:shadow-sm"
      prepend-icon="mdi-export-variant"
      variant="tonal"
      color="blue"
      >Xuất danh sách</v-btn
    >
  </div>
  <v-card v-if="lecturers" class="rounded-lg">
    <slot name="action"></slot>
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
              class="me-1"
              size="small"
              :variant="
                lecturer.role === UserRoleEnum.Admin ? 'outlined' : 'tonal'
              "
            >
              {{ getUserRoleName(lecturer.role) }}
            </v-chip>
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
              <!-- <div>
                <v-tooltip text="Xóa tài khoản" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      variant="plain"
                      icon="mdi-delete-outline"
                      color="red-accent-1"
                      @click="handleDeleteStudent(lecturer)"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div> -->
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

const emit = defineEmits(["edit", "deactive", "deleted", "refetch"]);

const props = defineProps<{ lecturers: LecturerDetails[] }>();

const model = reactive({
  search: "",
  type: "",
});

const isShowDeleteModal = ref(false);

const selectedStudent = ref<LecturerDetails>();

// const filterStudents = computed(() => {
//   return props.students?.filter(
//     (student) =>
//       student.userId
//         .toLocaleLowerCase()
//         .includes(model.search.toLocaleLowerCase()) ||
//       student.name
//         .toLocaleLowerCase()
//         .includes(model.search.toLocaleLowerCase()) ||
//       student.registerModule[0].moduleType === model.type
//   );
// });

const handleEdit = (student: LecturerDetails) => {
  emit("edit", student);
};

const handleDeleteStudent = (student: LecturerDetails) => {
  isShowDeleteModal.value = true;
  selectedStudent.value = student;
};

const handleDeleted = () => {
  isShowDeleteModal.value = false;
  emit("deleted");
};
</script>

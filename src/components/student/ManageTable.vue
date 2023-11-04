<template>
  <hr />
  <div class="d-flex flex-row justify-end my-4">
    <v-btn
      v-if="filterStudents"
      class="hover:shadow-sm"
      prepend-icon="mdi-export-variant"
      variant="tonal"
      color="blue"
      >Xuất danh sách</v-btn
    >
  </div>
  <v-card v-if="filterStudents" class="rounded-lg">
    <div class="px-4 mt-4 d-flex flex-row">
      <div>
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
      </div>
      <!-- <v-btn
        icon="mdi-cached"
        title="Refresh"
        variant="plain"
        @click="emit('refetch')"
      ></v-btn> -->
      <v-btn
        class="ml-2"
        icon="mdi-restore"
        title="Restore"
        variant="plain"
        @click="model.search = ''"
      ></v-btn>
    </div>
    <v-divider inset />
    <v-table>
      <thead>
        <tr class="text-overline">
          <th class="text-left">MSSV</th>
          <th class="text-left">Sinh viên</th>
          <th class="text-left">
            <v-btn
              id="type-menu"
              size="small"
              variant="text"
              append-icon="mdi-menu-down"
              >Học phần đăng ký</v-btn
            >
            <v-menu activator="#type-menu">
              <v-list density="compact" class="rounded-lg">
                <div class="mx-1">
                  <v-list-item
                    v-for="({ label, value }, index) in topicTypeOptionsCustom"
                    :key="index"
                    :value="value"
                    class="rounded-lg"
                    @click="model.type = value"
                  >
                    <span class="text-caption">
                      {{ label }}
                    </span>
                  </v-list-item>
                </div>
              </v-list>
            </v-menu>
          </th>
          <th>Thực hiện</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-sm"
          v-for="student in filterStudents"
          :key="student._id"
        >
          <td class="uppercase">
            {{ student.userId }}
          </td>
          <td>
            <v-list-item class="rounded-lg w-38">
              <p class="text-grey-800 text-xs">
                {{ student.name }}
              </p>
              <p class="text-caption text-xs text-grey">
                {{ student.email }}
              </p>
            </v-list-item>
          </td>
          <td v-if="student.registerModule[0].moduleType">
            <span
              v-for="(item, index) in getRegisterModule(
                student.registerModule[0].moduleType
              )"
              :key="index"
            >
              <v-chip
                class="me-1"
                v-if="item"
                size="small"
                :color="getTopicTypeColor(item)"
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
    <div
      v-if="filterStudents.length === 0"
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

import { topicTypeOptionsCustom } from "@/components/form/data/topicTypeOptionsCustom";

const emit = defineEmits(["edit", "deactive", "deleted", "refetch"]);

const props = defineProps<{ students: StudentDetails[] }>();

const model = reactive({
  search: "",
  type: "",
});

const isShowDeleteModal = ref(false);

const selectedStudent = ref<StudentDetails>();

const filterStudents = computed(() => {
  return props.students?.filter(
    (student) =>
      student.userId
        .toLocaleLowerCase()
        .includes(model.search.toLocaleLowerCase()) ||
      student.name
        .toLocaleLowerCase()
        .includes(model.search.toLocaleLowerCase()) ||
      student.registerModule[0].moduleType === model.type
  );
});

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
</script>

<template>
  <div v-if="semesters" class="rounded-lg">
    <div class="flex flex-row justify-end">
      <v-btn
        color="indigo"
        variant="tonal"
        class="ma-2"
        @click="isShow = !isShow"
        :disabled="model.isRecent"
      >
        Thiết lập học kì niên khóa
      </v-btn>
    </div>

    <v-table>
      <thead class="font-bold text-overline">
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Mã Học kì - Năm học</th>
          <th class="text-left">Học kì - Năm học</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-sm" v-for="(item, index) in semesters" :key="index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.sysId }}
          </td>
          <td>
            {{ getSchoolYearSemester(item) }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="semesters.length === 0" class="text-body-2 text-center my-4">
      Không có dữ liệu
    </div>
  </div>

  <v-dialog v-model="isShow" persistent width="500px">
    <v-card class="pt-4 pb-2 px-2">
      <v-card-title class="text-h5 text-indigo">
        <span class="mb-1"> Thiết lập Học kì - Niên khóa</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Bạn có xác nhận thiết lập học kì niên khóa hay không?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel"> Hủy </v-btn>
        <v-btn color="green-darken-1" variant="tonal" @click="handleSubmit()">
          Xác nhận
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";
import { isBefore } from "date-fns";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["updated-semester"]);

const props = defineProps<{ semesters: SchoolYearSemester[] }>();

const model = reactive({
  schoolYear: null,
  semester: null,
  error: "",
  isRecent: false,
});

const isShow = ref(false);

watch(
  () => props.semesters,
  () => {
    if (props.semesters[0]) {
      // model.isRecent = props.semesters[0].sysId === "s1b2023";
      model.isRecent = isBefore(
        new Date(Date.now()),
        new Date(props.semesters[0].schoolYear.endAt)
      );
    }
  }
);

const generatedSemesters = semesterData();

const handleCancel = () => {
  isShow.value = !isShow.value;
};

const handleSubmit = async () => {
  // await generateData;
  try {
    const { data: response } = await API.post(
      `/sys/establish`,
      generatedSemesters.value
    );

    handleCancel();
    toast.success("Thiết lập học kì niên khóa thành công");
    emit("updated-semester");
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
</script>

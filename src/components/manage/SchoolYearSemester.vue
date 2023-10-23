<template>
  <CustomCard :title="'Học kì - Niên khóa'">
    <template v-slot:action
      ><v-btn
        color="info"
        variant="tonal"
        class="ma-2"
        @click="isShow = !isShow"
      >
        Thiết lập học kì niên khóa
      </v-btn>
    </template>
    <template v-slot:content>
      <div class="py-2 w-2/5" v-if="semesters">
        <v-autocomplete
          variant="solo"
          v-model="model.schoolYear"
          :items="schoolYearOptions"
          label="Niên khóa"
          class="mb-2"
          chips
          clearable
        ></v-autocomplete>
      </div>
    </template>
  </CustomCard>

  <v-dialog v-model="isShow" persistent width="550px">
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

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const model = reactive({
  schoolYear: null,
  semester: null,
  error: "",
});

const semesters = ref<SchoolYearSemester[]>();

// const generatedSemesters = ref<{}[]>();

const isShow = ref(false);

const getData = async () => {
  try {
    const { data: response } = await API.get(`/sys`);
    semesters.value = response;
    // console.log(semesters.value);
    return response;
  } catch (error) {
    console.log(error);
  }
};

getData();

const schoolYearOptions = computed(() => {
  return semesters.value?.map((item) => ({
    title: getSchoolYearSemester(item),
    value: item.sysId,
  }));
});

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

    semesters.value = response;
    handleCancel();
    toast.success("Thiết lập học kì niên khóa thành công");
    return response;
  } catch (error: any) {
    // const {
    //   sysId,
    //   schoolYear: { beginAt, endAt },
    //   semester,
    // } = error.response.data.errors;
    // toast.error(sysId);
    console.log(error);
  }
};
</script>

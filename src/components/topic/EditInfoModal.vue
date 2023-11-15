<template>
  <div :v-if="props.editTopic">
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="pt-4 pb-2 px-2">
        <v-form v-model="form">
          <v-card-title class="d-flex text-h5 text-indigo justify-between">
            <div>
              <p class="mb-1">
                <span>Cập nhật đề tài </span>
              </p>
              <p class="font-light text-sm text-black text-caption">
                Chỉnh sửa các thông tin đề tài bên dưới
              </p>
            </div>
            <v-btn icon @click="handleCancel" variant="flat"
              ><v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              v-model="model.name"
              :rules="rules.name"
              clearable
              label="Tên đề tài"
              hint="Nhập vào tên đề tài"
              variant="outlined"
              class="mb-2"
            ></v-text-field>
            <div class="flex flex-row">
              <div class="w-3/5 me-2">
                <v-autocomplete
                  v-model="model.module"
                  :rules="rules.module"
                  :items="moduleOptions"
                  hint="Học phần của đề tài"
                  label="Học phần"
                  placeholder="Học phần"
                  class="mb-2"
                  width="300"
                  chips
                  clearable
                  variant="outlined"
                ></v-autocomplete>
              </div>
              <div class="w-2/5">
                <v-text-field
                  v-model="model.numberOfStudent"
                  :rules="rules.numberOfStudent"
                  type="number"
                  default="1"
                  min="1"
                  ref="input"
                  label="Số lượng sinh viên"
                  hint="Số sinh viên mặc định là 1"
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>
              </div>
            </div>
            <v-textarea
              class="mb-2"
              v-model="model.description"
              clearable
              counter="500"
              label="Mô tả đề tài"
              variant="outlined"
              hint="Mô tả đề tài với các nội dung liên quan (công nghệ, phạm vi...)"
            ></v-textarea>
            <div class="w-3/5 me-2">
              <v-autocomplete
                v-model="model.semesterId"
                :rules="rules.semester"
                :items="sysOptions"
                hint="Chọn Học kì - Niên khóa của đề tài"
                label="Học kì - Năm học"
                placeholder="Học kì - Năm học"
                class="mb-2"
                width="300"
                chips
                clearable
                variant="outlined"
              ></v-autocomplete>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="text" @click="handleCancel">
              Hủy
            </v-btn>
            <v-btn
              :disabled="!form"
              color="blue"
              variant="tonal"
              :onclick="handleEditTopic"
            >
              <span> Cập nhật đề tài</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";

const form = ref();

const semesters = ref<SchoolYearSemester[]>();

const modules = ref<ModuleDetails[]>();

const emit = defineEmits(["cancel", "edited"]);

const props = defineProps<{
  isShow: boolean;
  editTopic: TopicDetails;
}>();

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

const model = reactive({
  name: "",
  module: "",
  numberOfStudent: 1,
  description: "",
  isDisplay: false,
  semesterId: "",
  error: "",
});

const rules = ref({
  name: [
    (value: any) => {
      if (value?.length === 0 || model.name === null)
        return "Tên đề tài không được rỗng";
      return true;
    },
  ],
  module: [
    () => {
      if (model.module === null) return "Học phần không được rỗng";
      return true;
    },
  ],
  semester: [
    () => {
      if (model.semesterId === null) return "Học kì - Năm học không được rỗng";
      return true;
    },
  ],
  numberOfStudent: [
    (value: any) => {
      if (value <= 0) return "Số sinh viên ít nhất là 1";
      return true;
    },
  ],
});

const sysOptions = computed(() => {
  return semesters.value?.map((item: any) => ({
    title: getSchoolYearSemester(item),
    value: item._id,
  }));
});

const dialog = computed(() => {
  return props.isShow;
});

const moduleOptions = computed(() => {
  return modules.value?.map((module) => ({
    title: module.moduleId + " | " + module.name,
    value: module._id,
  }));
});

watch(
  () => props.editTopic,
  () => {
    const { name, module, numberOfStudent, description, semester } =
      props.editTopic;
    if (semester !== undefined) {
      setModelData(name, module, numberOfStudent, description, semester._id);
    } else {
      setModelData(name, module, numberOfStudent, description);
    }
  }
);

const setModelData = (
  name: string,
  module: ModuleDetails,
  numberOfStudent: number,
  description: string,
  semesterId?: string
) => {
  model.name = name;
  model.numberOfStudent = numberOfStudent;
  model.description = description;

  if (semesterId) {
    model.semesterId = semesterId;
  }
  if (module) {
    model.module = module._id;
  }
};

const handleCancel = () => {
  emit("cancel");
  const {
    name,
    module,
    numberOfStudent,
    description,
    semester: { _id: semesterId },
  } = props.editTopic;
  setModelData(name, module, numberOfStudent, description, semesterId);
};

const getData = async () => {
  try {
    const { data: response } = await API.get(`/sys`);
    semesters.value = response;
    return response;
  } catch (error) {
    console.log(error);
  }
};

getData();

const handleEditTopic = async (e: Event) => {
  e.preventDefault();

  const { name, module, description, numberOfStudent, semesterId } = model;
  try {
    const { data: response } = await API.put(
      `/topic/update/${props.editTopic._id}`,
      {
        name,
        module,
        description,
        numberOfStudent,
        semester: semesterId,
      }
    );

    //set data for form by response data
    model.name = response.name;
    model.module = response.module;
    model.numberOfStudent = response.numberOfStudent;
    model.description = response.description;
    model.semesterId = response.semester;

    emit("edited");
  } catch (error) {
    console.log(error);
  }
};
</script>

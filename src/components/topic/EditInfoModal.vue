<template>
  <div :v-if="props.editTopic">
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="pt-3 pb-2 px-2 rounded-lg">
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
                  :disabled="editTopic.student.length != 0"
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
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>
              </div>
            </div>
            <v-textarea
              auto-grow
              class="mb-2"
              v-model="model.description"
              clearable
              counter
              label="Mô tả đề tài"
              variant="outlined"
              hint="Mô tả đề tài với các nội dung liên quan (công nghệ, phạm vi...)"
            ></v-textarea>
            <div class="w-3/5 me-2">
              <v-autocomplete
                v-model="model.semesterId"
                :rules="rules.semester"
                :items="sysOptions"
                :disabled="editTopic.student.length != 0"
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
import { Option } from "@/apis/models/Option";

const form = ref();

const emit = defineEmits(["cancel", "edited"]);

const props = defineProps<{
  isShow: boolean;
  editTopic: TopicDetails;
  modules: ModuleDetails[];
  sysOptions: Option[];
}>();

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
      if (value < props.editTopic.student.length)
        return "Số lượng không được nhỏ hơn số lượng sinh viên đã đăng ký";
      return true;
    },
  ],
});

const dialog = computed(() => {
  return props.isShow;
});

const moduleOptions = computed(() => {
  return props.modules?.map((module) => ({
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

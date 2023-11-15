<template>
  <div>
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="pt-4 pb-2 px-2 rounded-lg">
        <v-form v-model="form">
          <v-card-title class="d-flex text-h5 text-indigo justify-between">
            <div>
              <span class="mb-1"> Thêm mới đề tài</span>
              <p class="font-light text-caption text-black">
                Hãy điền thông tin vào các trường bên dưới để thực hiện thêm mới
                đề tài
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
                  :rules="rules.topicType"
                  :items="moduleOptions"
                  hint="Chọn một trong các học phần"
                  label="Học phần"
                  placeholder="Học phần"
                  class="mb-2"
                  width="300"
                  chips
                  clearable
                  variant="outlined"
                >
                </v-autocomplete>
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
                  class="mb-2 ml-2"
                ></v-text-field>
              </div>
            </div>
            <v-textarea
              v-model="model.description"
              clearable
              counter="500"
              label="Mô tả đề tài"
              variant="outlined"
              hint="Mô tả đề tài với các nội dung liên quan (công nghệ, phạm vi...)"
              class="mb-2"
            ></v-textarea>
            <div class="flex flex-row">
              <div class="w-3/5 me-2">
                <v-autocomplete
                  v-model="model.semesterId"
                  :rules="rules.semesterId"
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
              <div class="w-2/5 me-2">
                <v-switch
                  v-model="model.isDisplay"
                  true-value="true"
                  false-value="false"
                  hide-details
                  inset
                  color="primary"
                  label="Hiển thị đề tài"
                  class="mx-auto ml-2"
                ></v-switch>
              </div>
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
              :onclick="handleCreateTopic"
            >
              Tạo đề tài
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";

import { RECENT_SEMESTER_ID } from "@/constant";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { topicRules } from "../form/rules/topicRules";

import { useAuthStore } from "@/stores/useAuthStore";

interface Option {
  title: string;
  value: string;
  subtitle?: string;
}

const emit = defineEmits(["cancel", "created"]);

const props = defineProps<{
  isShow: boolean;
  sysOptions: Option[];
  modules: ModuleDetails[];
}>();

const { user } = storeToRefs(useAuthStore());

const form = ref();

const model = reactive({
  name: null,
  type: null,
  numberOfStudent: 1,
  description: null,
  isDisplay: false,
  semesterId: RECENT_SEMESTER_ID,
  error: "",
  module: null,
});

const rules = topicRules();

const moduleOptions = computed(() => {
  return props.modules?.map((module) => ({
    title: module.moduleId + " | " + module.name,
    value: module._id,
    subtitle: module.name,
  }));
});

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  model.type = null;
  model.name = null;
  emit("cancel");
};

const handleCreateTopic = (e: Event) => {
  console.log(model);
  e.preventDefault();

  try {
    API.post(`/topic`, {
      name: model.name,
      pi: user.value?._id,
      isDisplay: model.isDisplay,
      description: model.description,
      numberOfStudent: model.numberOfStudent,
      semester: model.semesterId,
      module: model.module,
    });
    model.name = null;
    model.type = null;
    model.numberOfStudent = 1;
    model.description = null;
    model.isDisplay = false;
    model.semesterId = RECENT_SEMESTER_ID;
    model.module = null;

    emit("created");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="pt-4 pb-2 px-2">
        <v-form v-model="form">
          <v-card-title class="text-h5 text-indigo">
            <span class="uppercase mb-1"> Thêm mới đề tài </span>
            <p class="font-light text-sm text-black text-caption">
              Hãy điền thông tin vào các trường bên dưới để thực hiện thêm mới
              đề tài
            </p>
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
                  v-model="model.type"
                  :rules="rules.topicType"
                  :items="topicTypeOptions"
                  hint="Chọn một trong các phân loại đề tài"
                  label="Phân loại đề tài"
                  placeholder="Phân loại đề tài"
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
              v-model="model.description"
              clearable
              counter="500"
              label="Mô tả đề tài"
              variant="outlined"
              hint="Mô tả đề tài với các nội dung liên quan (công nghệ, phạm vi...)"
            ></v-textarea>
            <div class="flex flex-row">
              <div class="w-3/5 me-2">
                <v-autocomplete
                  v-model="model.semesterId"
                  :rules="rules.semesterId"
                  :items="semesterOptions"
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
                  class="mx-auto"
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
import { SchoolYearSemester } from "@/apis/models/SchoolYearSemester";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { useAuthStore } from "@/stores/useAuthStore";
import { getSchoolYearSemester } from "@/utils/getSchoolYearSemester";
import { getTopicTypeName } from "@/utils/getTopicTypeName";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { computed } from "vue";
import { ref } from "vue";

const emit = defineEmits(["cancel", "created"]);

const props = defineProps<{
  isShow: boolean;
}>();

const { user } = storeToRefs(useAuthStore());

const form = ref();

const semesters = ref<SchoolYearSemester[]>();

const model = reactive({
  name: null,
  type: null,
  numberOfStudent: null,
  description: null,
  isDisplay: false,
  semesterId: null,
  error: "",
});

const rules = ref({
  name: [
    (value: any) => {
      if (value?.length == 0 || model.name === null)
        return "Tên đề tài không được rỗng";
      return true;
    },
  ],
  topicType: [
    () => {
      if (model.type === null) return "Hãy chọn phân loại đề tài";
      return true;
    },
  ],
  semesterId: [
    () => {
      if (model.semesterId === null) return "Hãy chọn Học kì - Niên khóa";
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

const topicTypeOptions = computed(() => {
  return Object.values(TopicTypeEnum).map((item) => ({
    title: getTopicTypeName(item),
    value: item,
  }));
});

const semesterOptions = computed(() => {
  return semesters.value?.map((item) => ({
    title: getSchoolYearSemester(item),
    value: item._id,
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

const handleCreateTopic = (e: Event) => {
  console.log(model);
  e.preventDefault();

  try {
    API.post(`/topic`, {
      name: model.name,
      pi: user.value?._id,
      type: model.type,
      isDisplay: model.isDisplay,
      description: model.description,
      numberOfStudent: model.numberOfStudent,
      semester: model.semesterId,
    });
    model.name = null;
    model.type = null;
    model.numberOfStudent = null;
    model.description = null;
    model.isDisplay = false;
    model.semesterId = null;

    emit("created");
  } catch (error) {
    console.log(error);
  }
};
</script>

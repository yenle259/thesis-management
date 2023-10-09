<template>
  <div :v-if="props.editTopic">
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="pt-4 pb-2 px-2">
        <v-form v-model="form">
          <v-card-title class="text-h5 text-indigo">
            <div>
              <p class="uppercase mb-1">
                <span>Cập nhật đề tài </span>
              </p>
              <p class="font-light text-sm text-black text-caption">
                Chỉnh sửa các thông tin đề tài bên dưới
              </p>
            </div>
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
            <!-- <v-switch
              v-model="model.isDisplay"
              hide-details
              inset
              color="primary"
              label="Hiển thị đề tài"
            ></v-switch> -->
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
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { getTopicTypeName } from "@/utils/getTopicTypeName";
import { watch } from "vue";
import { reactive } from "vue";
import { computed } from "vue";
import { ref } from "vue";

const form = ref();

const emit = defineEmits(["cancel", "edited"]);

const props = defineProps<{
  isShow: boolean;
  editTopic: TopicDetails;
}>();

const model = reactive({
  name: "",
  type: "",
  numberOfStudent: 1,
  description: "",
  isDisplay: false,
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
  topicType: [
    () => {
      if (model.type === null) return "Phân loại đề tài không được rỗng";
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

const dialog = computed(() => {
  return props.isShow;
});

watch(
  () => props.editTopic,
  () => {
    const { name, type, numberOfStudent, description } = props.editTopic;
    setModelData(name, type, numberOfStudent, description);
  }
);

const setModelData = (
  name: string,
  type: TopicTypeEnum,
  numberOfStudent: number,
  description: string
) => {
  model.name = name;
  model.type = type;
  model.numberOfStudent = numberOfStudent;
  model.description = description;
};

const handleCancel = () => {
  emit("cancel");
  const { name, type, numberOfStudent, description } = props.editTopic;
  setModelData(name, type, numberOfStudent, description);
};

const handleEditTopic = async (e: Event) => {
  e.preventDefault();

  const { name, type, description, numberOfStudent } = model;
  try {
    const { data: response } = await API.put(
      `/topic/update/${props.editTopic._id}`,
      {
        name,
        type,
        description,
        numberOfStudent,
      }
    );

    //set data for form by response data
    model.name = response.name;
    model.type = response.type;
    model.numberOfStudent = response.numberOfStudent;
    model.description = response.description;

    emit("edited");
  } catch (error) {
    console.log(error);
  }
};
</script>

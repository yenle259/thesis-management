<template>
  <div>
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="pt-4 pb-2 px-2">
        <v-form v-model="form">
          <v-card-title class="text-h5 text-indigo">
            <span class="uppercase mb-1"> Đăng ký đề tài </span>
            <p class="font-light text-sm text-black">
              Hãy chọn các trường bên dưới để thực hiện đăng ký đề tài hướng dẫn
            </p>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-autocomplete
              v-model="model.lecturerId"
              :rules="rules.lecturerId"
              :items="lecturerNameOptions"
              label="Giảng viên hướng dẫn"
              placeholder="Giảng viên hướng dẫn"
              class="mb-2"
              clearable
              variant="outlined"
            ></v-autocomplete>
            <v-autocomplete
              v-model="model.topicType"
              :rules="rules.topicType"
              :items="topicTypeOptions"
              label="Phân loại đề tài"
              placeholder="Phân loại đề tài"
              class="mb-2"
              chips
              clearable
              variant="outlined"
            ></v-autocomplete>
            <v-combobox
              v-model="model.topicName"
              :rules="rules.topicName"
              label="Tên đề tài"
              clearable
              :items="topicNameOptions"
              variant="outlined"
              hint="Chọn đề tài trong danh sách của giảng viên hoặc nhập vào đề tài"
            ></v-combobox>
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
              :onclick="handleRegister"
            >
              Đăng ký
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { UserDetails } from "@/apis/models/UserDetails";
import { BASE_API } from "@/constant";
import { getTopicTypeName } from "@/utils/getTopicTypeName";
import axios from "axios";
import { watch } from "vue";
import { reactive } from "vue";
import { computed } from "vue";
import { ref } from "vue";

const form = ref();

const model = reactive({
  lecturerId: null,
  topicType: null,
  topicName: null,
  error: "",
});

const rules = ref({
  lecturerId: [
    () => {
      if (model.lecturerId === null) return "Hãy chọn giảng viên hướng dẫn";
      return true;
    },
  ],
  topicType: [
    () => {
      if (model.topicType === null) return "Hãy chọn phân loại đề tài";
      return true;
    },
  ],
  topicName: [
    (value: any) => {
      if (value?.length == 0 || model.topicName === null)
        return "Chọn đề tài của giảng viên hoặc nhập vào tên đề tài";
      return true;
    },
  ],
});

const emit = defineEmits(["cancel", "updated"]);

const props = defineProps<{
  isShow: boolean;
  lecturer: UserDetails;
  lecturers: UserDetails[];
}>();

const topics = ref<TopicDetails[]>();

axios({
  url: BASE_API + `/topic`,
  withCredentials: true,
})
  .then(function (res) {
    topics.value = res.data;
  })
  .catch(function (error) {
    console.log(error);
  });

const lecturerNameOptions = computed(() => {
  return props.lecturers?.map(({ _id, name }) => ({
    title: name,
    value: _id,
  }));
});

watch(
  () => model.lecturerId,
  (value) => {
    const topicByLecturerId = topics.value?.filter(
      ({ pi }) => pi._id === value
    );
  }
);

const topicNameOptions = computed(() => {
  return topics.value
    ?.filter(({ pi, type }) => pi._id === model.lecturerId)
    .map(({ _id, name, pi }) => ({
      title: name,
      value: _id,
      piId: pi._id,
    }));
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

const handleCancel = () => {
  model.lecturerId = null;
  model.topicType = null;
  model.topicName = null;
  emit("cancel");
};

const handleRegister = () => {
  console.log(model);
  // emit("cancel");
};
</script>

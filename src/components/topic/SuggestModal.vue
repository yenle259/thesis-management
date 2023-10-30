<template>
  <div>
    <v-dialog v-model="dialog" width="650px" persistent>
      <v-card class="pt-4 pb-2 px-2 rounded-lg">
        <v-form v-model="form">
          <v-card-title class="d-flex text-h5 text-indigo justify-between">
            <div>
              <span class="uppercase mb-1"> Đề xuất đề tài </span>
              <p class="text-caption text-black">
                Hãy chọn các trường bên dưới để thực hiện đề xuất đề tài trong
                học kì này
              </p>
            </div>
            <v-btn icon @click="handleCancel" variant="flat"
              ><v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="flex flex-row">
              <div class="w-3/5 me-2">
                <v-autocomplete
                  v-model="model.lecturerId"
                  :rules="rules.lecturerId"
                  :items="lecturerNameOptions"
                  autofocus
                  label="Giảng viên hướng dẫn"
                  class="mb-2"
                  clearable
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :title="item?.title"
                      :subtitle="item.raw.subtitle"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </div>
              <div class="w-2/5">
                <v-autocomplete
                  v-model="model.topicType"
                  :rules="rules.topicType"
                  :items="topicTypeOptions"
                  label="Phân loại đề tài"
                  class="mb-2"
                  chips
                  clearable
                ></v-autocomplete>
              </div>
            </div>
            <v-text-field
              rows="2"
              v-model="model.topicName"
              :rules="rules.topicName"
              label="Tên đề tài"
              clearable
            ></v-text-field>
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
import { TopicTypeEnum } from "@/apis/models/TopicTypeEnum";
import { UserDetails } from "@/apis/models/UserDetails";

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
      if (model.lecturerId === null)
        return "Hãy chọn giảng viên muốn đề xuất đề tài";
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
    () => {
      if (model.topicName === null) return "Hãy nhập vào tên đề tài đề xuất";
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

const lecturerNameOptions = computed(() => {
  return props.lecturers?.map(({ _id, name, email }) => ({
    subtitle: email,
    title: name,
    value: _id,
  }));
});

// watch(
//   () => model.lecturerId,
//   (value) => {
//     const topicByLecturerId = topics.value?.filter(
//       ({ pi }) => pi._id === value
//     );
//   }
// );

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

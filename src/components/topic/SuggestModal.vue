<template>
  <div>
    <v-dialog v-model="dialog" width="650px" persistent>
      <v-card class="pt-4 pb-2 px-2 rounded-lg">
        <v-form v-model="form">
          <v-card-title class="d-flex text-h5 text-indigo justify-between">
            <div>
              <span> Đề xuất đề tài </span>
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
              <div class="w-1/2 me-2">
                <v-autocomplete
                  v-model="model.lecturerId"
                  :rules="rules.lecturerId"
                  :items="lecturerNameOptions"
                  hint="Chọn giảng viên muốn đề xuất đề tài"
                  label="Giảng viên"
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
              <div class="w-1/2">
                <v-autocomplete
                  v-model="model.topicType"
                  :rules="rules.topicType"
                  :items="
                    moduleOptions.filter(
                      ({ subvalue }) => !registeredModules.includes(subvalue)
                    )
                  "
                  hint="Chọn một trong các phân loại đề tài"
                  label="Học phần"
                  placeholder="Học phần"
                  class="mb-2"
                  width="300"
                  chips
                  clearable
                >
                </v-autocomplete>
              </div>
            </div>
            <v-text-field
              rows="2"
              v-model="model.topicName"
              :rules="rules.topicName"
              label="Tên đề tài"
              clearable
            ></v-text-field>
            <v-textarea
              v-model="model.description"
              clearable
              counter
              label="Mô tả đề tài"
              hint="Mô tả đề tài với các nội dung liên quan (công nghệ, phạm vi...)"
              class="mb-2"
            ></v-textarea>
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
              @click="handleSuggestTopic"
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
import API from "@/apis/helpers/axiosBaseConfig";
import { RegisterModule } from "@/apis/models/RegisterModule";
import { UserDetails } from "@/apis/models/UserDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { TopicDetails } from "@/apis/models/TopicDetails";

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["cancel", "suggested"]);

const props = defineProps<{
  isShow: boolean;
  lecturers: UserDetails[];
  modules: ModuleDetails[];
  registerModule: RegisterModule;
  registered: TopicDetails[];
}>();

const form = ref();

const model = reactive({
  lecturerId: null,
  topicType: null,
  topicName: null,
  description: null,
  error: "",
  availabelModule: [""],
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

const lecturerNameOptions = computed(() => {
  return props.lecturers?.map(({ _id, name, email }) => ({
    subtitle: email,
    title: name,
    value: _id,
  }));
});

const registeredModules = computed(() => {
  return props.registered.map(({ module }) => module.moduleId);
});

// const isDisabledSuggest = computed(() => {
//   return (
//     moduleOptions.value.filter(
//       ({ subvalue }) => !registeredModules.value.includes(subvalue)
//     ).length !== 0
//   );
// });

watch(
  () => registeredModules,
  () => {
    console.log(registeredModules);
  }
);

const moduleOptions = computed(() => {
  return props.modules
    ?.map(({ _id, moduleId, name }) => ({
      title: moduleId + " | " + name,
      value: _id,
      subvalue: moduleId,
    }))
    .filter(({ subvalue }) =>
      props.registerModule.moduleType.includes(subvalue)
    );
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

const handleSuggestTopic = async (e: Event) => {
  console.log(model);
  e.preventDefault();

  try {
    const { data: response } = await API.post(`/topic/suggest`, {
      studentId: user.value?._id,
      name: model.topicName,
      pi: model.lecturerId,
      module: model.topicType,
      description: model.description,
    });

    model.topicName = null;
    model.topicType = null;
    model.description = null;
    model.lecturerId = null;

    emit("suggested");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div :v-if="props.student">
    <v-dialog v-model="dialog" persistent width="650px">
      <v-card class="rounded-lg pt-3 pb-2 px-2">
        <v-form v-model="form">
          <v-card-title class="d-flex text-h5 text-indigo justify-between">
            <div>
              <span class="mb-1">Cập nhật thông tin sinh viên</span>
              <p class="font-light text-caption text-black">
                Cập nhật các thông tin của sinh viên
              </p>
            </div>
            <v-btn icon @click="handleCancel" variant="flat"
              ><v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="gap-x-2">
              <v-text-field
                v-model="model.userId"
                :required="true"
                :rules="rules.userId"
                :error-messages="errorMessage.userId"
                class="mb-2"
                clearable
                label="Mã số sinh viên"
                counter
                prepend-inner-icon="mdi-at"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <!-- <v-text-field
              v-model="model.password"
              :rules="rules.password"
              :type="show ? 'text' : 'password'"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show = !show"
              class="mb-2"
              prepend-inner-icon="mdi-key"
              variant="outlined"
              label="Mật khẩu"
              density="compact"
            ></v-text-field> -->
              <v-text-field
                v-model="model.name"
                :required="true"
                :rules="rules.name"
                :error-messages="errorMessage.name"
                class="mb-2"
                clearable
                label="Họ tên"
                prepend-inner-icon="mdi-account-circle-outline"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <v-text-field
                v-model="model.email"
                type="email"
                :required="true"
                :rules="rules.email"
                :error-messages="errorMessage.email"
                class="mb-2"
                label="Email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <v-autocomplete
                v-model="model.moduleType"
                :items="moduleOptions"
                item-value="subvalue"
                prepend-inner-icon="mdi-format-list-bulleted"
                label="Học phần"
                placeholder="Học phần"
                class="mb-2"
                multiple
                chips
                clearable
                density="compact"
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
              <span> Cập nhật </span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { StudentDetails } from "@/apis/models/StudentDetails";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

import { RECENT_SEMESTER_ID } from "@/constant";
import { studentUpdateRules } from "@/components/form/rules/studentUpdateRules";

const form = ref();

const emit = defineEmits(["cancel", "edited"]);

const props = defineProps<{
  isShow: boolean;
  student: StudentDetails;
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

const moduleOptions = computed(() => {
  return modules.value?.map((module) => ({
    title: module.moduleId + " | " + module.name,
    value: module._id,
    subtitle: module.name,
    subvalue: module.moduleId,
  }));
});

const model = reactive({
  userId: "",
  name: "",
  email: "",
  // password: "",
  moduleType: ["CT554"],
});

const modules = ref<ModuleDetails[]>();

const rules = studentUpdateRules();

const errorMessage = ref({
  userId: "",
  name: "",
  email: "",
  password: "",
  moduleType: "",
});

watch(
  () => props.student,
  () => {
    const { userId, name, email, registerModule } = props.student;

    registerModule?.map((item) => {
      if (item.semester._id === RECENT_SEMESTER_ID) {
        model.moduleType = item.moduleType.split("-");
        return;
      }
    });

    model.userId = userId;
    model.name = name;
    model.email = email;
  }
);

watch(
  () => model.moduleType,
  () => {
    if (model.moduleType[0] === "") {
      model.moduleType = [];
    }
    console.log(model.moduleType);
  }
);

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleEditTopic = async (e: Event) => {
  e.preventDefault();

  const { userId, name, email, moduleType } = model;
  try {
    const { data: response } = await API.put(
      `/student/update/${props.student._id}`,
      {
        userId,
        name,
        email,
        moduleType: moduleType.join("-"),
      }
    );

    emit("edited");
  } catch (error: any) {
    console.log(error.response);
  }
};
</script>

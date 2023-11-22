<template>
  <div>
    <CustomCard
      :title="'Thông tin cá nhân'"
      :subTitle="'Chi tiết thông tin cá nhân của tài khoản'"
    >
      <template v-slot:content>
        <v-card class="rounded-lg px-2 pt-3">
          <v-card-text>
            <v-form v-model="form">
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
                <v-text-field
                  v-model="model.password"
                  :rules="rules.password"
                  :type="model.show ? 'text' : 'password'"
                  :append-inner-icon="model.show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="model.show = !model.show"
                  class="mb-2"
                  prepend-inner-icon="mdi-key"
                  variant="outlined"
                  label="Mật khẩu"
                  density="compact"
                ></v-text-field>
              </div>
              <v-btn
                :disabled="!form"
                color="indigo"
                :onclick="handleEditTopic"
              >
                <span> Cập nhật </span>
              </v-btn>
              <v-btn
                icon="mdi-restore"
                class="mx-2"
                variant="plain"
                @click="handleCancel"
              >
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ModuleDetails } from "@/apis/models/ModuleDetails";
import { studentUpdateRules } from "@/components/form/rules/studentUpdateRules";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const { user } = storeToRefs(useAuthStore());

const form = ref();

const emit = defineEmits(["cancel", "edited"]);

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
  show: false,
  userId: user.value?.userId,
  name: user.value?.name,
  email: user.value?.email,
  password: user.value?.email,
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

// watch(
//   () => props.student,
//   () => {
//     const { userId, name, email, registerModule } = props.student;

//     registerModule?.map((item) => {
//       if (item.semester._id === RECENT_SEMESTER_ID) {
//         model.moduleType = item.moduleType.split("-");
//         return;
//       }
//     });

//     model.userId = userId;
//     model.name = name;
//     model.email = email;
//   }
// );

const handleCancel = () => {};

const handleEditTopic = async (e: Event) => {
  e.preventDefault();

  const urlByRole = user.value?.role ? "/user/update/" : "/student/update/";

  const { userId, name, email } = model;
  try {
    const { data: response } = await API.put(urlByRole + `${user.value?._id}`, {
      userId,
      name,
      email,
    });

    toast.success("Cập nhật thông tin thành công");
  } catch (error: any) {
    console.log(error.response);
  }
};
</script>

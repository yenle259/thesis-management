<template>
  <div :v-if="props.user">
    <v-dialog v-model="dialog" persistent width="700px">
      <v-card class="rounded-lg pt-4 pb-2 px-2">
        <v-form v-model="form">
          <v-card-title class="d-flex text-h5 text-indigo justify-between">
            <div>
              <span class="mb-1">Cập nhật thông tin cán bộ</span>
              <p class="font-light text-caption text-black">
                Cập nhật các thông tin của cán bộ
              </p>
            </div>
            <v-btn icon @click="handleCancel" variant="flat"
              ><v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="grid grid-cols-2 gap-x-2">
              <v-text-field
                v-model="model.userId"
                :required="true"
                :rules="rules.userId"
                :error-messages="errorMessage.userId"
                class="mb-2"
                clearable
                label="Mã số cán bộ"
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
                v-model="model.role"
                :items="userRoleOptions"
                prepend-inner-icon="mdi-format-list-bulleted"
                label="Vai trò cán bộ"
                placeholder="Vai trò cán bộ"
                class="mb-2"
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
import { LecturerDetails } from "@/apis/models/LecturerDetails";
import { userRoleOptions } from "@/components/form/data/userRoleOptions";

import { lecturerUpdateRules } from "@/components/form/rules/lecturerUpdateRules";

const form = ref();

const emit = defineEmits(["cancel", "edited"]);

const props = defineProps<{
  isShow: boolean;
  user: LecturerDetails;
}>();

const model = reactive({
  userId: "",
  name: "",
  email: "",
  // password: "",
  role: props.user.role,
});

const rules = lecturerUpdateRules();

const errorMessage = ref({
  userId: "",
  name: "",
  email: "",
  password: "",
  moduleType: "",
});

watch(
  () => props.user,
  () => {
    const { userId, name, email, role } = props.user;
    model.userId = userId;
    model.name = name;
    model.email = email;
    model.role = role;
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

  const { userId, name, role, email } = model;
  try {
    const { data: response } = await API.put(`/user/update/${props.user._id}`, {
      userId,
      name,
      email,
      role,
    });

    emit("edited");

    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};
</script>

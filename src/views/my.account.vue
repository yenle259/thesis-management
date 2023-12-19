<template>
  <div>
    <CustomCard
      :title="'Thông tin cá nhân'"
      :subTitle="'Chi tiết thông tin cá nhân của tài khoản'"
    >
      <template v-slot:content>
        <v-card
          class="rounded-lg px-2 pt-3 mx-auto"
          variant="text"
          max-width="500"
        >
          <div>
            <v-tabs class="mb-8" v-model="model.tab" color="indigo" fixed-tabs>
              <v-tab
                :variant="model.tab === 'info' ? 'tonal' : 'text'"
                value="info"
                >CẬP NHẬT THÔNG TIN</v-tab
              >
              <v-tab
                :variant="model.tab === 'password' ? 'tonal' : 'text'"
                value="password"
                >CẬP NHẬT MẬT KHẨU</v-tab
              >
            </v-tabs>

            <v-window v-model="model.tab" class="mb-4 px-3">
              <v-window-item key="info" value="info">
                <div>
                  <v-form v-model="formInfo">
                    <v-text-field
                      v-model="model.userId"
                      :required="true"
                      :rules="rules.userId"
                      class="mb-2 mt-1"
                      clearable
                      label="Mã số người dùng"
                      counter
                      variant="underlined"
                      density="comfortable"
                    ></v-text-field>
                    <v-text-field
                      v-model="model.name"
                      :required="true"
                      :rules="rules.name"
                      class="mb-2"
                      label="Họ tên người dùng"
                      variant="underlined"
                      density="comfortable"
                    ></v-text-field>
                    <v-text-field
                      v-model="model.email"
                      type="email"
                      :required="true"
                      :rules="rules.email"
                      class="mb-2"
                      label="Email"
                      variant="underlined"
                      density="comfortable"
                    ></v-text-field>
                    <v-btn
                      block
                      :disabled="!formInfo"
                      color="indigo"
                      @click="handleEditTopic"
                    >
                      <span> Cập nhật </span>
                    </v-btn>
                  </v-form>
                </div>
              </v-window-item>
              <v-window-item key="password" value="password">
                <v-form v-model="formPassword">
                  <v-text-field
                    v-model="model.password"
                    :rules="rules.password"
                    :type="model.show ? 'text' : 'password'"
                    :append-inner-icon="model.show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="model.show = !model.show"
                    class="mb-2 mt-1"
                    counter
                    variant="underlined"
                    label="Mật khẩu mới"
                    density="comfortable"
                  ></v-text-field>
                  <v-text-field
                    v-model="model.rePassword"
                    :rules="rules.rePassword"
                    :type="model.showRePw ? 'text' : 'password'"
                    :append-inner-icon="
                      model.showRePw ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :disabled="model.password.length == 0"
                    @click:append-inner="model.showRePw = !model.showRePw"
                    class="mb-2"
                    counter
                    variant="underlined"
                    label="Nhập lại mật khẩu"
                    density="comfortable"
                  ></v-text-field>
                  <v-btn
                    block
                    :disabled="!formPassword"
                    color="indigo"
                    @click="handleUpdatePassword"
                  >
                    <span> Cập nhật </span>
                  </v-btn>
                </v-form>
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </template>
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const { user } = storeToRefs(useAuthStore());

const modules = ref<ModuleDetails[]>();

const formInfo = ref(false);
const formPassword = ref(false);

const route = useRoute();

const model = reactive({
  show: false,
  showRePw: false,
  tab: route.query.update ?? "info",
  userId: user.value?.userId,
  name: user.value?.name,
  email: user.value?.email,
  password: "",
  rePassword: "",
});

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

const rules = ref({
  userId: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào mã số người dùng";
      if (value?.length == 4) return true;
      if (value?.length == 8) return true;
      return "Mã số người dùng có 4 hoặc 8 kí tự";
    },
  ],
  name: [
    (value: any) => {
      if (value?.length === 0) return "Họ tên người dùng không được rỗng";
      return true;
    },
  ],
  email: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào email";
      return true;
    },
  ],
  password: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập vào mật khẩu";
      if (value?.length >= 8) return true;
      return "Mật khẩu phải có ít nhất 8 kí tự";
    },
  ],
  rePassword: [
    (value: any) => {
      if (value?.length == 0) return "Hãy nhập lại mật khẩu";
      if (model.rePassword !== model.password)
        return "Mật khẩu nhập lại không chính xác";
      return true;
    },
  ],
});

watch(
  () => route.query.update,
  () => {
    model.tab = route.query.update;
  }
);
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
    if (model.tab === "info") {
      console.log(model.tab);
    }
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};

const handleUpdatePassword = async () => {
  const { userId, password } = model;
  try {
    const { data: response } = await API.put(`/auth/update`, {
      userId,
      newPassword: password,
    });

    toast.success("Cập nhật mật khẩu thành công");
    model.password = "";
    model.rePassword = "";
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
};
</script>

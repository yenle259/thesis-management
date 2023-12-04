<template>
  <div v-if="modules" class="rounded-lg">
    <div class="flex flex-row justify-end">
      <v-btn
        color="indigo"
        variant="tonal"
        class="ma-2"
        @click="model.isShow = !model.isShow"
      >
        Thêm học phần
      </v-btn>
    </div>
    <v-table>
      <thead class="font-bold text-overline">
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Mã số học phần</th>
          <th class="text-left">Tên học phần</th>
          <th class="text-left">Thực hiện</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-sm"
          v-for="({ moduleId, name }, index) in modules"
          :key="index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <v-chip :color="getTopicModuleColor(moduleId)" size="small">
              {{ moduleId }}
            </v-chip>
          </td>
          <td>
            {{ name }}
          </td>
          <td>
            <v-tooltip text="Xóa học phần" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  size="small"
                  variant="plain"
                  icon="mdi-delete-outline"
                  color="red-accent-1"
                  @click="handleRemove(moduleId)"
                ></v-btn>
              </template>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="modules.length === 0" class="text-body-2 text-center my-4">
      Không có học phần
    </div>
  </div>

  <v-dialog v-model="model.isShow" persistent width="500px" closeable>
    <v-card class="pt-3 rounded-lg pb-2 px-2">
      <v-card-title class="d-flex text-h5 text-indigo justify-between">
        <div>
          <span class="mb-1">Thêm mới học phần</span>
          <p class="font-light text-caption text-black">
            Thêm mới danh mục học phần
          </p>
        </div>
        <v-btn icon @click="handleCancel" variant="flat"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="model.form">
          <v-text-field
            v-model="model.moduleId"
            @input="model.moduleId = model.moduleId.toUpperCase()"
            :rules="rules.moduleId"
            label="Mã học phần"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="model.name"
            :rules="rules.name"
            label="Tên học phần"
            variant="outlined"
          ></v-text-field
        ></v-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel()"> Hủy </v-btn>
        <v-btn
          color="green-darken-1"
          :disabled="!model.form"
          variant="tonal"
          @click="handleSubmit"
        >
          Xác nhận
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { ModuleDetails } from "@/apis/models/ModuleDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["updated-module"]);

defineProps<{ modules: ModuleDetails[] }>();

const model = reactive({
  isShow: false,
  form: false,
  moduleId: "",
  name: "",
});

const rules = ref({
  moduleId: [
    (value: any) => {
      if (value?.length == 0) return "Mã số học phần không được rỗng";
      return true;
    },
  ],
  name: [
    (value: any) => {
      if (value?.length == 0) return "Tên học phần không được rỗng";
      return true;
    },
  ],
});

const handleCancel = () => {
  model.isShow = false;
  model.moduleId = "";
  model.name = "";
};

const handleSubmit = async () => {
  try {
    const { data: response } = await API.post(`/module/create`, {
      moduleId: model.moduleId,
      name: model.name,
    });
    emit("updated-module");
    handleCancel();
    toast.success("Thêm mới học phần thành công");
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

const handleRemove = async (moduleId: string) => {
  try {
    const { data: response } = await API.delete(`/module/remove/${moduleId}`);
    emit("updated-module");
    toast.success(`Đã xóa học phần ${moduleId}`);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
</script>

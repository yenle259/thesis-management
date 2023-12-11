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
        <tr class="text-sm" v-for="(module, index) in modules" :key="index">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <v-chip :color="getTopicModuleColor(module.moduleId)" size="small">
              {{ module.moduleId }}
            </v-chip>
          </td>
          <td>
            {{ module.name }}
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
                  @click="handleOpenRemove(module)"
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

  <v-dialog v-model="model.isDeleteModal" persistent width="500px" closeable>
    <v-card class="pt-3 rounded-lg pb-2 px-2">
      <v-card-title class="d-flex text-h5 text-indigo justify-between">
        <div>
          <span class="mb-1">Xác nhận xóa học phần</span>
          <p class="font-light text-caption text-black">
            Xác nhận xóa học phần với các thông tin bên dưới
          </p>
        </div>
        <v-btn icon @click="handleCancel" variant="flat"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="mb-1">
          <span class="text-subtitle-2">Mã học phần: </span
          ><span class="uppercase">{{ selectedModule?.moduleId }}</span>
        </p>
        <p class="mb-1">
          <span class="text-subtitle-2">Tên học phần: </span
          >{{ selectedModule?.name }}
        </p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel()"> Hủy </v-btn>
        <v-btn
          v-if="selectedModule"
          color="green-darken-1"
          variant="tonal"
          @click="handleRemove(selectedModule?.moduleId)"
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

const selectedModule = ref<ModuleDetails>();

defineProps<{ modules: ModuleDetails[] }>();

const model = reactive({
  isShow: false,
  isDeleteModal: false,
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

const handleOpenRemove = (module: ModuleDetails) => {
  model.isDeleteModal = true;
  selectedModule.value = module;
};

const handleCancel = () => {
  model.isShow = false;
  model.isDeleteModal = false;
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
  model.isDeleteModal = false;
  try {
    const { data: response } = await API.delete(`/module/remove/${moduleId}`);
    if (response.statusCode === 200) {
      toast.success(`Đã xóa học phần với mã số ${moduleId}`);
      emit("updated-module");
    }
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<template>
  <div v-if="props.deleteTopic">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="pt-3 pb-2 px-2 rounded-lg">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1"> Xóa đề tài</span>
            <p class="font-light text-caption text-black">
              Xác nhận xóa đề tài với thông tin bên dưới
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="mb-1">
            <span class="text-subtitle-2">Tên đề tài: </span
            >{{ props.deleteTopic.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Phân loại: </span>
            <v-chip :color="getTopicModuleColor(deleteTopic.type)" size="small">
              {{
                deleteTopic.module.moduleId + " | " + deleteTopic.module.name
              }}
            </v-chip>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" variant="text" @click="handleCancel">
            Thoát
          </v-btn>
          <v-btn
            color="red"
            variant="tonal"
            @click="handleDelete(props.deleteTopic)"
          >
            Xóa đề tài
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";

import { TopicDetails } from "@/apis/models/TopicDetails";

const emit = defineEmits(["cancel", "deleted"]);

const props = defineProps<{ isShow: boolean; deleteTopic: TopicDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleDelete = async (topic: TopicDetails) => {
  try {
    await API.delete(`/topic/${topic._id}`);
    emit("deleted");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-if="props.deleteTopic">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="pt-4 pb-2 px-2">
        <v-card-title class="text-h5 text-indigo">
          <span class="uppercase mb-1"> Xóa đề tài </span>
          <p class="font-light text-caption text-black">
            Xác nhận xóa đề tài với thông tin bên dưới
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="uppercase font-bold text-overline">Thông tin đề tài</p>
          <p class="mb-1">
            <span class="text-subtitle-2">Tên đề tài: </span
            >{{ props.deleteTopic.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Phân loại: </span>
            <v-chip :color="getTopicTypeColor(deleteTopic.type)" size="small">
              {{ getTopicTypeName(props.deleteTopic.type) }}
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
import { TopicDetails } from "@/apis/models/TopicDetails";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

import { computed } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import router from "@/router";
import API from "@/apis/helpers/axiosBaseConfig";

const { user } = storeToRefs(useAuthStore());

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

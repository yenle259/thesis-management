<template>
  <div>
    <v-tooltip text="Chỉnh sửa thông tin đề tài" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          size="small"
          variant="text"
          icon="mdi-pencil"
          color="indigo"
          @click="handleOpenEditForm"
        ></v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";

const emit = defineEmits(["isEdit"]);

const props = defineProps<{ topic: TopicDetails }>();

const handleOpenEditForm = () => {
  emit("isEdit", props.topic);
};
</script>

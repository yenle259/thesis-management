<template>
  <div>
    <v-tooltip :text="model.isDisplay?'Ẩn đề tài':'Hiển thị đề tài'" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          v-model="model.isDisplay"
          class="ma-2"
          variant="text"
          :icon="model.isDisplay ? 'mdi-eye' : 'mdi-eye-off'"
          :color="model.isDisplay ? 'blue-lighten-2' : 'gray'"
          @click="handleChangeHiddenStatus"
        ></v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>
import API from "@/apis/helpers/axiosBaseConfig";
import { reactive } from "vue";

const emit = defineEmits(["cancel", "updated"]);

const props = defineProps<{ isDisplay: boolean; topicId: string }>();

const model = reactive({
  isDisplay: props.isDisplay,
});

const handleChangeHiddenStatus = () => {
  updateStatus();
};

const updateStatus = async () => {
  try {
    const { data: response } = await API.put(`/topic/update/${props.topicId}`, {
      isDisplay: !props.isDisplay,
    });
    model.isDisplay = response.isDisplay;
    emit("updated");

    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>

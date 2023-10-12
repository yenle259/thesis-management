<template>
  <!-- <v-switch
    v-model="model.isPublish"
    true-value="true"
    false-value="false"
    hide-details
    color="indigo"
    inset
    label="Công bố đề tài"
  ></v-switch> -->
  <v-btn
    v-model="model.isPublish"
    variant="tonal"
    color="blue"
    @click="isShow = !isShow"
  >
    Công bố đề tài
  </v-btn>
  <v-dialog v-model="isShow" persistent width="520px" closeable>
    <v-card class="pt-4 pb-2 px-2">
      <v-card-title class="text-h5 text-indigo">
        <span class="mb-1"> Công bố đề tài</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Xác nhận công bố danh sách đề tài ở thời điểm hiện tại?</p>
        <p class="text-caption">(Hoặc chọn hẹn thời gian để công bố sau)</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel()"> Hủy </v-btn>
        <v-btn color="orange" variant="text" @click="model.dialog = true">
          Hẹn thời gian
        </v-btn>
        <v-btn color="green-darken-1" variant="tonal" @click="handleSubmit()">
          Xác nhaanj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="model.dialog" persistent width="290px">
    <v-date-picker show-adjacent-months>
      <v-spacer></v-spacer>
      <v-btn variant="text" color="primary" @click="handleCancel()">
        Cancel
      </v-btn>
      <v-btn variant="text" color="primary" @click="handleSetDate()">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { usePublishTopicList } from "@/stores/usePublishTopicList";
import { VDatePicker } from "vuetify/labs/VDatePicker";

import { ref } from "vue";
import { reactive, watch } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const publish = usePublishTopicList();

const date = ref();

const model = reactive({
  isPublish: false,
  dialog: false,
});

const isShow = ref<boolean>(false);

const publishDate = ref<Date>();

watch(
  () => model.isPublish,
  () => {
    publish.change();
  }
);

const handleCancel = () => {
  console.log("cancel");
  isShow.value = !isShow.value;
  model.dialog = false;
};

const handleSubmit = async () => {
  const recentDate = new Date(Date.now());
  console.log(recentDate);

  try {
    const { data: response } = await API.put(`/publish/set`, {
      publishDate: recentDate,
      id: "6526f1c4ac0072dcd9517532",
    });
    toast.success("Công bố danh sách đề tài thành công");
    handleCancel();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleSetDate = async () => {
  console.log(date);
};
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-dots-vertical"
        v-bind="props"
        variant="tonal"
        color="indigo"
      ></v-btn>
    </template>
    <v-list class="rounded-lg px-2">
      <v-list-item
        disabled
        class="rounded-lg"
        @click="model.setTimeModal = true"
        >Ngừng đăng ký đề tài
      </v-list-item>
      <v-list-item
        class="rounded-lg"
        @click="model.publishModal = !model.publishModal"
        >Mở đăng ký đề tài
      </v-list-item>
      <v-list-item class="rounded-lg" @click="model.setTimeModal = true"
        >Đặt thời gian mở đăng ký đề tài
      </v-list-item>
    </v-list>
  </v-menu>

  <!-- dialog to publish topic -->
  <v-dialog v-model="model.publishModal" persistent width="520px" closeable>
    <v-card class="pt-4 pb-2 px-2">
      <v-card-title class="text-h5 text-indigo">
        <span class="mb-1"> Công bố đề tài</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Xác nhận công bố danh sách đề tài ở thời điểm hiện tại?</p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="handleCancel()"> Hủy </v-btn>
        <v-btn
          color="green-darken-1"
          variant="tonal"
          @click="handleSubmit(Date.now())"
        >
          Xác nhận
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- dialog to setup publish date -->
  <v-dialog v-model="model.setTimeModal" persistent width="500px">
    <v-card class="pt-4 pb-2 px-2">
      <v-form v-model="model.form">
        <v-card-title class="text-h5 text-indigo">
          <span class="mb-1"> Đặt thời gian</span>
          <p class="font-light text-sm text-black text-caption">
            Đặt thời gian để công bố danh sách đề tài
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            :rules="rules.publishDate"
            :min="Date.now()"
            type="datetime-local"
            v-model="model.scheduleTime"
            label="Thời gian công bố"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-spacer> </v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="handleCancel()">
            Hủy
          </v-btn>
          <v-btn
            :disabled="!model.form"
            color="green-darken-1"
            variant="tonal"
            @click="handleSetPublishDate(model.scheduleTime)"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import API from "@/apis/helpers/axiosBaseConfig";
import { parseISO } from "date-fns";
import { usePublishTopicList } from "@/stores/usePublishTopicList";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const publish = usePublishTopicList();

const model = reactive({
  form: false,
  isPublish: false,
  publishModal: false,
  setTimeModal: false,
  scheduleTime: "",
});

const rules = ref({
  publishDate: [
    (value: any) => {
      const recentDate = new Date(Date.now());
      if (parseISO(value) >= recentDate) return true;
      return "Thời gian công bố phải sau thời điểm hiện tại";
    },
  ],
});

watch(
  () => model.isPublish,
  () => {
    publish.change(model.isPublish);
  }
);

const handleCancel = () => {
  model.publishModal = false;
  model.setTimeModal = false;
};

const handleSubmit = async (scheduleTime: any) => {
  const date = new Date(scheduleTime);

  try {
    const { data: response } = await API.put(`/publish/set`, {
      publishDate: date,
      id: "6526f1c4ac0072dcd9517532",
    });

    toast.success("Mở đăng ký đề tài thành công");

    handleCancel();
    return response;
  } catch (error) {
    console.log(error);
  }
};

//scheduleTime
const handleSetPublishDate = async (scheduleTime: any) => {
  const date = new Date(scheduleTime);

  try {
    const { data: response } = await API.put(`/publish/set`, {
      publishDate: date,
      id: "6526f1c4ac0072dcd9517532",
    });

    toast.success(
      "Đặt thời gian mở đăng ký danh sách đề tài: " +
        getFormatDate(parseISO(scheduleTime))
    );
    handleCancel();
    return response;
  } catch (error) {
    console.log(error);
  }
};
</script>

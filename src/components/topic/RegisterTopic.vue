<template>
  <div v-if="props.topic">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="pt-4 pb-2 px-2">
        <v-card-title class="text-h5 text-indigo">
          <span class="uppercase mb-1"> Xác nhận đăng ký </span>
          <p class="font-light text-caption text-black">
            Xác nhận đăng ký đề tài với thông tin đề tài bên dưới
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="uppercase font-bold mb-2">Thông tin đề tài</p>
          <p class="mb-1">
            <span class="font-bold">Tên đề tài: </span>{{ props.topic.name }}
          </p>
          <p class="mb-1">
            <span class="font-bold">Chủ nhiệm: </span>{{ props.topic.pi.name }}
          </p>
          <p class="mb-1">
            <span class="font-bold">Phân loại: </span>
            <v-chip :color="getTopicTypeColor(topic.type)" size="small">
              {{ getTopicTypeName(props.topic.type) }}
            </v-chip>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="handleCancel"> Hủy </v-btn>
          <v-btn
            color="green-darken-1"
            variant="tonal"
            @click="handleRegisterTopic(props.topic._id)"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { BASE_API } from "@/constant";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

import { computed, ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { getTopicTypeColor } from "@/utils/getTopicTypeColor";

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["cancel", "registered"]);

const props = defineProps<{ isShow: boolean; topic: TopicDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleRegisterTopic = (topicId: string) => {
  // toast.info(topicId + " & " + user.value?._id);

  axios({
    method: "post",
    url: BASE_API + `/topic/register`,
    withCredentials: true,
    data: {
      studentId: user.value?._id,
      topicId,
    },
  })
    .then(function (res) {
      console.log(res.data);
      toast.success("Đăng ký đề tài thành công!");
      emit("registered", props.topic);
    })
    .catch(function (error) {
      toast.error(error.message);
    });
};

const handleCancel = () => {
  emit("cancel");
};
</script>

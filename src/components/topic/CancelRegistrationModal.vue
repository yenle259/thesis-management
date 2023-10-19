<template>
  <div v-if="props.topic">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="pt-4 pb-2 px-2">
        <v-card-title class="text-h5 text-indigo">
          <span class="uppercase mb-1"> Hủy đăng ký đề tài </span>
          <p class="font-light text-caption text-black">
            Xác nhận hủy đăng ký đề tài với thông tin đề tài bên dưới
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="uppercase font-bold mb-2">Thông tin đề tài</p>
          <p class="mb-1">
            <span class="font-bold">Tên đề tài: </span>{{ props.topic.name }}
          </p>
          <p class="mb-1">
            <span class="font-bold">Giảng viên: </span>{{ props.topic.pi.name }}
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
          <v-btn color="red" variant="text" @click="handleCancel">
            Thoát
          </v-btn>
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

import router from "@/router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const emit = defineEmits(["cancel", "unregistered"]);

const props = defineProps<{ isShow: boolean; topic: TopicDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleRegisterTopic = (topicId: string) => {
  // toast.info(topicId + " & " + user.value?._id);
  axios({
    method: "put",
    url: BASE_API + `/topic/unregister/${props.topic.slug}`,
    withCredentials: true,
  })
    .then(function (res) {
      console.log(res.data);
      toast.success("Hủy đăng ký đề tài thành công!");
      emit("unregistered");
      router.push("/topic-list");
    })
    .catch(function (error) {
      toast.error(error.message);
    });
};

const handleCancel = () => {
  emit("cancel");
};
</script>

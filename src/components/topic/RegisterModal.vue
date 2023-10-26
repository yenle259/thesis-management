<template>
  <div v-if="props.topic">
    <v-dialog v-model="dialog" width="600px">
      <v-card class="px-2 pt-3 pb-2 rounded-lg" v-click-outside="handleCancel">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1"> Xác nhận đăng ký </span>
            <p class="font-light text-caption text-black">
              Xác nhận đăng ký đề tài với thông tin đề tài bên dưới
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <p class="mb-1">
            <span class="text-subtitle-2">Tên đề tài: </span>
            <span>
              {{ props.topic.name }}
            </span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Giảng viên: </span>
            <span class="text-indigo">
              {{ props.topic.pi.name }}
            </span>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Phân loại: </span>
            <v-chip :color="getTopicTypeColor(topic.type)" size="small">
              {{ getTopicTypeName(props.topic.type) }}
            </v-chip>
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Học kì - Niên khóa: </span
            >{{ getSchoolYearSemester(topic.semester) }}
          </p>
        </div>
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
import API from "@/apis/helpers/axiosBaseConfig";
import { TopicDetails } from "@/apis/models/TopicDetails";
import { TIME_OUT } from "@/constant";
import { useAuthStore } from "@/stores/useAuthStore";
import router from "@/router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const { user } = storeToRefs(useAuthStore());

const { registeredTopic } = storeToRefs(useStudentStore());

const emit = defineEmits(["cancel", "registered"]);

const props = defineProps<{ isShow: boolean; topic: TopicDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleRegisterTopic = async (topicId: string) => {
  try {
    const { data: response } = await API.post(`/topic/register`, {
      studentId: user.value?._id,
      topicId,
    });

    toast.success("Đăng ký đề tài thành công!");
    emit("registered", props.topic);
    registeredTopic.value = response.topic._id;
    setTimeout(() => router.push(`user/topic/${props.topic.slug}`), TIME_OUT);
  } catch (error: any) {
    if (error.response) {
      const { errors } = error.response.data;
      if (errors.publishDate) {
        toast.error(errors.publishDate);
      }
    }
  }
};

const handleCancel = () => {
  emit("cancel");
};
</script>

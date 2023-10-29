<template>
  <div v-if="props.topic">
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card class="rounded-lg pt-4 pb-2 px-2" v-click-outside="handleCancel">
        <v-card-title class="d-flex text-h5 text-indigo justify-between">
          <div>
            <span class="mb-1"> Hủy đăng ký đề tài </span>
            <p class="font-light text-caption text-black">
              Xác nhận hủy đăng ký đề tài với thông tin đề tài bên dưới
            </p>
          </div>
          <v-btn icon @click="handleCancel" variant="flat"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <p class="mb-1">
            <span class="text-subtitle-2">Tên đề tài: </span
            >{{ props.topic.name }}
          </p>
          <p class="mb-1">
            <span class="text-subtitle-2">Giảng viên: </span
            >{{ props.topic.pi.name }}
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
          <v-btn color="info" variant="text" @click="handleCancel">
            Thoát
          </v-btn>
          <v-btn
            color="red"
            variant="tonal"
            @click="handleUnregisterTopic(props.topic._id)"
          >
            Hủy đăng ký
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

import router from "@/router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const register = useStudentStore();

const { registeredTopic } = storeToRefs(useStudentStore());

const { user } = storeToRefs(useAuthStore());

const emit = defineEmits(["cancel", "unregistered"]);

const props = defineProps<{ isShow: boolean; topic: TopicDetails }>();

const dialog = computed(() => {
  return props.isShow;
});

const handleUnregisterTopic = async (topicId: string) => {
  try {
    const { data: response } = await API.put(
      `/topic/unregister/${props.topic.slug}`,
      { studentId: user.value?._id }
    );

    toast.success("Hủy đăng ký đề tài thành công!");
    emit("cancel");
    setTimeout(() => router.push("/topic-list"), TIME_OUT);
    registeredTopic.value = "";
  } catch (error: any) {
    toast.error(error.message);
  }
};

const handleCancel = () => {
  emit("cancel");
};
</script>

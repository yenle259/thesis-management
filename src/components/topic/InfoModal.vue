<template>
  <div v-if="props.topic">
    <v-dialog v-model="dialog" width="720px">
      <v-card
        class="rounded-lg bg-white px-8 pt-4 pb-6"
        v-click-outside="handleCancel"
      >
        <div v-if="topic">
          <div class="d-flex flex-row justify-between gap-x-2 my-1">
            <p>
              <span class="font-weight-medium text-overline text-black"
                >Đề tài:
              </span>
              <span
                class="font-weight-medium text-indigo uppercase tracking-wide"
              >
                {{ topic?.name }}
              </span>
            </p>
            <v-btn icon @click="handleCancel" variant="flat"
              ><v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <div>
            <div>
              <div class="d-flex flex-row justify-between">
                <v-tabs
                  v-model="model.tab"
                  color="indigo"
                  align-tabs="start"
                  density="compact"
                >
                  <v-tab :value="4" size="small">Thông tin</v-tab>
                  <v-tab :value="1" size="small">Mô tả đề tài</v-tab>
                  <v-tab :value="2" size="small">Giảng viên</v-tab>
                  <v-tab :value="3" size="small"
                    >Sinh viên đăng ký
                    <v-badge
                      color="blue"
                      :content="
                        topic.student.length + '/' + topic.numberOfStudent
                      "
                      inline
                    ></v-badge
                  ></v-tab>
                </v-tabs>
                <v-btn
                  class="self-center"
                  variant="tonal"
                  color="primary"
                  v-if="isRegister"
                  :disabled="isDisabled"
                  @click="handleRegister(topic)"
                >
                  Đăng ký</v-btn
                >
              </div>
              <v-window v-model="model.tab" class="mt-3">
                <v-window-item :key="4" :value="4" class="h-56 overflow-auto">
                  <div>
                    <span class="text-subtitle-2">Phân loại đề tài: </span>
                    <span>
                      <v-chip
                        :color="getTopicTypeColor(topic?.type)"
                        size="small"
                      >
                        {{ getTopicTypeName(topic?.type) }}
                      </v-chip>
                    </span>
                  </div>
                  <div class="my-1">
                    <span class="text-subtitle-2">Học kì - Năm học: </span>
                    <span>
                      {{ getSchoolYearSemester(topic.semester) }}
                    </span>
                  </div>
                  <div class="my-1">
                    <span class="text-subtitle-2">Số lượng sinh viên: </span>
                    <span>{{ topic.numberOfStudent }}</span>
                  </div>
                </v-window-item>
                <v-window-item :key="1" :value="1" class="h-56 overflow-auto">
                  <div>
                    <p
                      class="text-caption leading-relaxed indent-3 pe-2"
                      v-if="topic.description !== ''"
                    >
                      {{ topic.description }}
                    </p>
                    <p v-else class="text-center text-body-2">
                      Chưa có mô tả đề tài
                    </p>
                  </div>
                </v-window-item>
                <v-window-item :key="2" :value="2" class="h-56">
                  <div>
                    <CustomLecturerItem :lecturer="topic.pi" />
                  </div>
                </v-window-item>
                <v-window-item :key="3" :value="3" class="h-56">
                  <div v-if="topic.student.length !== 0">
                    <div v-for="user in topic.student" :key="user._id">
                      <CustomUserItem :user="user || {}" />
                    </div>
                  </div>
                  <div
                    class="mt-2 text-center align-baseline text-body-2"
                    v-else
                  >
                    Chưa có sinh viên đăng ký
                  </div>
                </v-window-item>
              </v-window>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";
import { useAuthStore } from "@/stores/useAuthStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const { user } = storeToRefs(useAuthStore());

const model = reactive({
  tab: 4,
});

const emit = defineEmits(["cancel", "register"]);

const props = defineProps<{
  isShow: boolean;
  topic: TopicDetails;
  isRegister: boolean;
}>();

const isDisabled = computed(() => {
  return props.topic.student?.length === props.topic.numberOfStudent;
});

const dialog = computed(() => {
  return props.isShow;
});

const handleCancel = () => {
  emit("cancel");
};

const handleRegister = (topic: TopicDetails) => {
  emit("cancel");
  emit("register", topic);
};
</script>

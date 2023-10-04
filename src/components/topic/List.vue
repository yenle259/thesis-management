<template>
  <div class="px-6 mb-8">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-4 text-blue-700">DANH SÁCH ĐỀ TÀI</p>
      <div class="py-3">
        <v-table :hover="true">
          <thead>
            <tr>
              <th class="text-left">Tên đề tài</th>
              <th class="text-left">Phân loại</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">Chủ nhiệm</th>
              <th class="text-left">Email</th>
              <th class="text-left">Thực hiện</th>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr class="text-sm" v-for="topic in props.topics" :key="topic.slug">
              <td>
                <a :href="'/topic/' + topic.slug">
                  {{ topic.name }}
                </a>
              </td>
              <td>
                <v-chip :color="getTopicTypeColor(topic.type)" size="small">
                  {{ getTopicTypeName(topic.type) }}
                </v-chip>
              </td>
              <td>{{ topic.pi.userId }}</td>
              <td>{{ topic.pi.name }}</td>
              <td>{{ topic.pi.email }}</td>
              <td>
                <v-btn
                  color="info"
                  :disabled="topic.student !== undefined"
                  variant="tonal"
                  class="ma-2"
                  @click="handleConfirmModal(topic._id)"
                  size="small"
                >
                  Đăng ký
                </v-btn>
              </td>
              <v-dialog v-model="dialog" persistent width="600px">
                <v-card class="pt-4 pb-2 px-2">
                  <v-card-title class="text-h5 text-indigo">
                    Xác nhận đăng ký
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <p class="uppercase font-bold mb-2">Thông tin đề tài</p>
                    <p>
                      <span class="font-bold">Tên đề tài: </span
                      >{{ topic.name }}
                    </p>
                    <p>
                      <span class="font-bold">Chủ nhiệm: </span
                      >{{ topic.pi.name }}
                    </p>
                    <p>
                      <span class="font-bold">Phân loại: </span
                      >{{ getTopicTypeName(topic.type) }}
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" variant="text" @click="dialog = false">
                      Hủy
                    </v-btn>
                    <v-btn
                      color="green-darken-1"
                      variant="tonal"
                      @click="handleRegisterTopic(topic._id)"
                    >
                      Xác nhận
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div v-if="props.topics.length == 0">
        <p class="py-2 italic text-center">Không có đề tài</p>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { TopicDetails } from "@/apis/models/TopicDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { getTopicTypeColor } from "@/utils/getTopicTypeColor";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { ref } from "vue";
import { BASE_API } from "@/constant";
import { getTopicTypeName } from "@/utils/getTopicTypeName";

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{ topics: TopicDetails[] }>();

const dialog = ref(false);

const handleRegisterTopic = (topicId: string) => {
  toast.info(topicId + " & " + user.value?._id);
  dialog.value = false;

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
    })
    .catch(function (error) {
      toast.error(error.message);
    });
};

const handleConfirmModal = (topicId: string) => {
  dialog.value = !dialog.value;
};
</script>

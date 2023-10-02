<template>
  <div class="px-6 pb-8">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-4 text-blue-700">DANH SÁCH ĐỀ TÀI</p>
      <div class="py-3">
        <v-table :hover="true">
          <thead>
            <tr>
              <th class="text-left">Tên đề tài</th>
              <th class="text-left">MSCB</th>
              <th class="text-left">Chủ nhiệm</th>
              <th class="text-left">Email</th>
              <th class="text-left">Thực hiện</th>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr class="text-sm" v-for="topic in topics" :key="topic.slug">
              <td>
                <a :href="'/topic/' + topic.slug">
                  {{ topic.name }}
                </a>
              </td>
              <td>{{ topic.pi.userId }}</td>
              <td>{{ topic.pi.name }}</td>
              <td>{{ topic.pi.email }}</td>
              <td>
                <v-btn
                  color="info"
                  variant="tonal"
                  class="ma-2"
                  @click="notify"
                >
                  Đăng ký
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { BASE_API } from "@/constant";
import axios from "axios";
import { ref } from "vue";
import { TopicDetails } from "@/apis/models/TopicDetails";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const topics = ref<TopicDetails[]>();
const notify = () => {
  toast.success("Đăng ký thành công !", {}); // ToastOptions
};

axios({
  url: BASE_API + `/topic`,
  withCredentials: true,
})
  .then(function (res) {
    console.log(res);
    topics.value = res.data;
  })
  .catch(function (error) {
    console.log(error);
  });
</script>

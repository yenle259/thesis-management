<template>
  <div>
    <!-- Lecturer Info on route -->
    <div class="px-8 pt-6" v-if="lecturer">
      <v-card width="300px" rounded="lg">
        <v-card-text>
          <p
            class="mb-2 uppercase text-h6 text-indigo tracking-wide font-weight-medium"
          >
            GIẢNG VIÊN
          </p>
          <hr />
          <CustomLecturerItem :lecturer="lecturer || {}" class="mt-2" />
        </v-card-text>
      </v-card>
    </div>
    <div>
      <TopicList :topics="topics ?? []" :title="'Danh sách đề tài của GV'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { BASE_API } from "@/constant";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

useTitle("QLĐT - Thông tin giảng viên");

const route = useRoute();

const lecturerId = route.params.id;

const lecturer = ref<UserDetails>();

const topics = ref<TopicDetails[]>();

axios({
  url: BASE_API + `/user/lecturers/${lecturerId}`,
  withCredentials: true,
  data: {
    userId: lecturerId,
  },
})
  .then(function (res) {
    lecturer.value = res.data;
  })
  .catch(function (error) {
    console.log(error);
  });

axios({
  url: BASE_API + `/topic/lecturerUserId/${route.params.id}`,
  withCredentials: true,
})
  .then(function (res) {
    topics.value = res.data;
    console.log(topics.value?.length);
  })
  .catch(function (error) {
    console.log(error);
  });
</script>

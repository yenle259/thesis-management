<template>
  <div>
    <!-- Lecturer Info on route -->
    <div v-if="lecturer">
      <UserInfo :title="'THÔNG TIN GIẢNG VIÊN'" :user="lecturer" />
    </div>
    <div>
      <TopicList :topics="topics ?? []" />
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

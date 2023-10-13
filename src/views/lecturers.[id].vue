<template>
  <div>
    <!-- Lecturer Info on route -->
    <div v-if="lecturer">
      <UserInfo :title="'THÔNG TIN GIẢNG VIÊN'" :user="lecturer" />
    </div>
    <!-- <div>
      <TopicList :topics="topics ?? []" />
    </div> -->
    <div>
      <div class="px-6 pb-6">
        <v-card variant="flat" class="py-6 px-8">
          <div class="flex justify-between">
            <p class="font-bold text-2xl pb-4 text-blue-700">
              DANH SÁCH ĐỀ TÀI
            </p>
          </div>

          <UserLecturerTopicTable :topics="topics ?? []" />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { UserDetails } from "@/apis/models/UserDetails";
import { BASE_API } from "@/constant";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const auth = useAuthStore();
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
  url: BASE_API + `/topic/lecturer/${lecturerId}`,
  withCredentials: true,
})
  .then(function (res) {
    topics.value = res.data;
    console.log(topics.value?.length);
  })
  .catch(function (error) {
    console.log(error);
  });

const notify = () => {
  if (lecturer.value) {
    toast.success(lecturer.value.name);
  }
};
</script>

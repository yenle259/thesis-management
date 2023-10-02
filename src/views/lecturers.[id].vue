<template>
  <div class="h-screen">
    <!-- Lecturer Info on route -->
    <div v-if="lecturer">
      <UserInfo :user="lecturer" />
    </div>
    <div>
      <TopicList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserDetails } from "@/apis/models/UserDetails";
import { BASE_API } from "@/constant";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const auth = useAuthStore();
const route = useRoute();
const lecturerId = route.params.id;
const lecturer = ref<UserDetails>();

axios({
  url: BASE_API + `/user/lecturers/${lecturerId}`,
  withCredentials: true,
  data: {
    userId: lecturerId,
  },
})
  .then(function (res) {
    console.log(res);
    lecturer.value = res.data;
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

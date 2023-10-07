<template>
  <div>
    <UserInfo :title="'Thông tin cá nhân'" :user="user || {}" />
  </div>
  <div v-if="topics?.length !== 0">
    <UserStudentTopic :topics="topics ?? []" />
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { BASE_API } from "@/constant";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const topics = ref<TopicDetails[]>();

axios({
  method: "post",
  url: BASE_API + `/topic/student`,
  withCredentials: true,
  data: {
    studentId: user.value?._id,
  },
})
  .then(function (res) {
    topics.value = res.data;
    console.log(topics.value);
  })
  .catch(function (error) {
    console.log(error);
  });

const notify = () => {
  toast.success("Wow so easy !", {}); // ToastOptions
};
</script>

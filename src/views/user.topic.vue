<template>
  <div class="h-screen">
    <TopicList :topics="topics ?? []" />
  </div>
</template>

<script lang="ts" setup>
import { TopicDetails } from "@/apis/models/TopicDetails";
import { BASE_API } from "@/constant";
import axios from "axios";
import { ref } from "vue";

const topics = ref<TopicDetails[]>();
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

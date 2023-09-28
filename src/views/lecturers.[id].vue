<template>
  <div>
    <div class="px-20 py-8 bg-sky-50">
      <div class="grid grid-cols-4">
        <div>
          <UserProfile />
        </div>
        <div class="col-span-3">
          <UserLecturerInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const lecturerId = route.params.id;

console.log(lecturerId);
</script>

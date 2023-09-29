<template>
  <div class="bg-indigo px-5 text-white fixed top-0 w-full shadow-md h-16">
    <v-card-title class="text-center justify-center py-5">
      <v-row align="center" justify="start">
        <div class="px-60">
          <v-btn
            size="45"
            icon="mdi-chevron-left"
            variant="tonal"
            @click="$router.push('/user')"
          >
          </v-btn>
        </div>
        <div class="flex grow justify-center main-txt text-md"></div>
        <div class="gap-2">
          <profile-avatar />
        </div>
      </v-row>
    </v-card-title>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import ProfileAvatar from "./ProfileAvatar.vue";

const router = useRoute();
</script>

<style scoped>
.bg-basil {
  background-color: #fffbe6 !important;
}
</style>

<template>
  <div class="h-screen">
    <UserInfo />
    <v-btn color="success" variant="tonal" class="ma-2" @click="notify">
      Open Toast
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const notify = () => {
  toast.success("Wow so easy !", {}); // ToastOptions
};
</script>

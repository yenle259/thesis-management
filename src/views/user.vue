<template>
  <div class="h-screen">
    <UserInfo :user="user" />
    <v-btn color="success" variant="tonal" class="ma-2" @click="notify">
      Open Toast
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const auth = useAuthStore();
const { user } = storeToRefs(auth);
const notify = () => {
  toast.success("Wow so easy !", {}); // ToastOptions
};
</script>

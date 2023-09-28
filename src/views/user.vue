<template>
  <div class="h-screen">
    <UserInfo />
    <AlertMessage
      v-show="isOpen"
      :is-open="isOpen"
      :color="'success'"
      :message="'Login Successfully!'"
    />

    <v-btn color="success" variant="tonal" class="ma-2" @click="isOpen = true"
      >open</v-btn
    >
    <v-btn @click="notify"> nopitgy </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AlertMessage from "@/components/core/AlertMessage.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const isOpen = ref(false);

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
  }); // ToastOptions
};
</script>

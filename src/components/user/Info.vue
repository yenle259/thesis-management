<template>
  <div class="px-6 pb-8">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-4 text-blue-700">THÔNG TIN CÁ NHÂN</p>
      <v-divider></v-divider>
      <div class="py-3 grid grid-cols-4 gap-4">
        <div class="font-bold">Mã số sinh viên</div>
        <div class="col-span-3">
          {{ user?.studentId.toLocaleUpperCase() }}
        </div>
        <div class="font-bold">Họ tên sinh viên</div>
        <div class="col-span-3">
          {{ user?.name }}
        </div>
        <div class="font-bold">Email</div>
        <div class="col-span-3">
          {{ user?.email }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { user } = storeToRefs(auth)
</script>

<template>
  <div class="px-6 pb-6">
    <v-card variant="flat" class="py-6 px-8">
      <p class="font-bold text-2xl pb-4 text-blue-700 capitalize">
        {{ props.title }}
      </p>
      <v-divider></v-divider>
      <div class="py-3 grid grid-cols-4 gap-4">
        <div class="font-bold">Mã số định danh</div>
        <div class="col-span-3">
          <p class="capitalize">
            {{ props.user?.userId }}
          </p>
        </div>
        <div class="font-bold">Họ tên</div>
        <div class="col-span-3">
          {{ props.user?.name }}
        </div>
        <div class="font-bold">Email</div>
        <div class="col-span-3">
          {{ props.user?.email }}
        </div>
        <div class="font-bold">SĐT</div>
        <div class="col-span-3">
          {{ props.user?.phone }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { UserDetails } from "@/apis/models/UserDetails";

const props = defineProps<{ user: UserDetails; title: String }>();
</script>

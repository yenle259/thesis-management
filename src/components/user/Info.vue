<template>
  <CustomCard :title="'Thông tin giảng viên'">
    <template v-slot:content>
      <v-card class="rounded-lg px-2" max-width="400px">
        <div class="p-4 gap-4">
          <div class="text-caption mb-1 text-md">
            <span class="font-bold">Mã số định danh: </span
            >{{ props.user.userId }}
          </div>
          <div class="text-caption mb-1 text-md">
            <span class="font-bold">Họ tên: </span>{{ props.user.name }}
          </div>
          <div class="text-caption text-md">
            <span class="font-bold">Email: </span>{{ props.user.email }}
          </div>
        </div>
      </v-card>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import { UserDetails } from "@/apis/models/UserDetails";

const props = defineProps<{ user: UserDetails; title: String }>();
</script>

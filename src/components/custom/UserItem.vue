<template>
  <div class="font-bevn">
    <div
      :key="user?._id"
      class="py-1 flex flex-row justify-between"
      v-if="user"
    >
      <div class="flex flex-row">
        <v-btn class="me-2" variant="flat" color="blue" size="30" rounded>
          <span class="text-h5">
            {{ props.user?.name.charAt(0).toLocaleUpperCase() }}</span
          >
        </v-btn>
        <div>
          <p class="text-grey-800 text-xs">{{ props.user.name }}</p>
          <p class="text-caption text-xs text-grey">
            {{ props.user.email }}
          </p>
        </div>
      </div>
      <div>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StudentDetails } from "@/apis/models/StudentDetails";
import { UserDetails } from "@/apis/models/UserDetails";

const props = defineProps<{ user: UserDetails | StudentDetails }>();
</script>

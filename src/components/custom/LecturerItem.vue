<template>
  <div v-if="lecturer">
    <div>
      <v-icon icon="mdi-account-circle-outline" class="me-2"></v-icon>Giảng
      viên:
      <a
        class="hover:cursor-pointer text-blue-800"
        @click="router.push('/lecturers/' + lecturer.userId)"
        >{{ lecturer.name }}</a
      >
    </div>
    <div class="my-1">
      <v-icon icon="mdi-at" class="me-2"></v-icon>Mã số cán bộ:

      {{ lecturer.userId }}
    </div>
    <div class="mt-1" @click="copy(lecturer.email)">
      <v-icon icon="mdi-email-outline" class="me-2"> </v-icon>Email:
      <v-tooltip
        activator="children"
        location="end"
        :text="copied ? 'Copied' : 'Copy Email'"
      >
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            {{ lecturer.email }}
          </span>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserDetails } from "@/apis/models/UserDetails";
import { useClipboard } from "@vueuse/core";

const router = useRouter();

defineProps<{ lecturer: UserDetails }>();

const { copy, copied } = useClipboard();
</script>

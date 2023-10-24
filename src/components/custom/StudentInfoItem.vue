<template>
  <div v-if="student">
    <div>
      <v-icon icon="mdi-account-circle-outline" class="me-2"></v-icon>Họ tên:
      <a
        class="text-blue-800"
        @click="router.push('/lecturers/' + student.userId)"
        >{{ student.name }}</a
      >
    </div>
    <div class="my-1">
      <v-icon icon="mdi-at" class="me-2"></v-icon>Mã số định danh:

      {{ student.userId }}
    </div>
    <div class="mt-1" @click="copy(student.email)">
      <v-icon icon="mdi-email-outline" class="me-2"> </v-icon>Email:
      <v-tooltip
        activator="children"
        location="end"
        :text="copied ? 'Copied' : 'Copy Email'"
      >
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            {{ student.email }}
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

const props = defineProps<{ student: UserDetails }>();

const { copy, copied } = useClipboard();
</script>

<template>
  <div>
    <LecturerList/>
  </div>
</template>

<script lang="ts" setup>
import LecturerList from '@/components/user/LecturerList.vue';

import { useTitle } from "@vueuse/core";

useTitle("QLĐT - Danh sách giảng viên");
</script>

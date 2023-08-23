<template>
  <div class="py-2">
    <v-card-title class="text-center justify-center py-6">
      <v-row align="center" justify="start">
        <img src="../../assets/cit.png" width="50" class="rounded-full" alt="logo">
        <a href="/" class="indent-4 font-semibold">
          <!-- COLLAGE OF INFORMATION AND COMMUNICATION TECHNOLOGY -->
          HỆ THỐNG QUẢN LÝ ĐỀ TÀI
        </a>
        <div class="flex grow justify-center main-txt text-md">
          <a href="/home" class="mx-8 hover:text-blue-500">GIỚI THIỆU</a>
          <a href="#" class="me-8 hover:text-blue-500">ĐÀO TẠO</a>
          <a href="#" class="me-8 hover:text-blue-500">NGHIÊN CỨU</a>
          <a href="#" class="me-8 hover:text-blue-500">BẢNG TIN</a>
        </div>
        <div class="gap-2">
          <v-btn variant="plain" icon="mdi-magnify"></v-btn>
          <!-- <v-btn class="me-2" variant="plain" icon="mdi-bell-outline"></v-btn> -->
          <v-btn variant="flat" rounded="xl" href="/login" color=""> Đăng nhập </v-btn>
        </div>
      </v-row>
    </v-card-title>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-basil {
  background-color: #fffbe6 !important;
}
</style>

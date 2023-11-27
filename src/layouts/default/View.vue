<template>
  <div class="bg-indigo text-black">
    <div class="fixed z-50 bg-indigo">
      <Sidebar />
      <Navbar />
    </div>
    <div class="mt-16 py-8 ml-64 bg-sky-50 pt-4 min-h-screen">
      <v-main>
        <router-view />
      </v-main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/core/Navbar.vue";
import Sidebar from "@/components/core/Sidebar.vue";
</script>

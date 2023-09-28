<template>
  <div>
    <div class="fixed z-50">
      <router-view name="Sidebar" />
      <router-view name="Navbar" />
    </div>
    <div class="mt-16 ml-64 bg-sky-50 pt-4">
      <v-main>
        <router-view />
      </v-main>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

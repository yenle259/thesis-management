<template>
  <div>
    <div class="fixed z-50">
      <router-view name="Sidebar" />
      <router-view name="Navbar" />
    </div>
    <div>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

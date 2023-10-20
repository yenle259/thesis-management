<template>
  <div class="bg-sky-50 w-full fixed top-0 px-6 pt-3">
    <div class="pl-3 pe-4 pt-2 pb-1 bg-white ml-64 rounded-lg c-shadow">
      <div class="flex flex-row justify-between">
        <div>
          <v-tooltip text="Trở lại" location="right">
            <template v-slot:activator="{ props }">
              <v-btn
                class="pb-1"
                v-bind="props"
                size="45"
                icon="mdi-chevron-left"
                variant="text"
                @click="$router.go(-1)"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
        <div class="flex flex-row gap-x-2">
          <v-badge :content="2" color="red">
            <v-btn variant="text" size="small" icon="mdi-bell-outline"></v-btn>
          </v-badge>
          <profile-avatar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileAvatar from "./ProfileAvatar.vue";
</script>

<style scoped>
.bg-basil {
  background-color: #fffbe6 !important;
}

</style>

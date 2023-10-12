<template>
  <div>
    <v-dialog width="500" v-model="model.isShow">
      <v-card variant="flat" class="pt-2 px-1">
        <v-card-title class="text-h6 text-indigo">
          <span class="uppercase"> <slot name="title"></slot> </span>
          <p class="font-light text-caption text-black"></p>
        </v-card-title>
        <v-card-text>
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Đóng" @click="model.isShow = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{ isShow: boolean }>();

const model = reactive({
  isShow: props.isShow,
});
</script>

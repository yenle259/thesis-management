<template>
  <v-snackbar
    :timeout="2000"
    variant="elevated"
    transition="slide-x-reverse-transition"
    location="top right"
    :color="props.color"
    :v-model="props.isOpen"
  >
    {{ props.message }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import { watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  color: String,
  message: String,
});
console.log(props);
watch(
  () => props.isOpen,
  (val) => {
    console.log(val);
  }
);
</script>

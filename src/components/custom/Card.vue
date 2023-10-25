<template>
  <div class="px-4 pb-6">
    <div variant="flat" class="py-4 px-4">
      <div class="grid grid-cols-3">
        <div class="col-span-2">
          <span class="font-weight-medium text-2xl pb-4 text-blue-700">
            {{ props.title }}
            <slot name="header"></slot>
          </span>
          <p class="font-light text-sm text-black text-caption">
            {{ props.subTitle }}
          </p>
        </div>
        <div class="flex flex-row justify-end">
          <slot name="action"></slot>
        </div>
      </div>

      <div class="py-3">
        <v-divider> </v-divider>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title?: String; subTitle?: string }>();
</script>
